const { JWT_SECRET, SALT_ROUNDS, bcrypt, jwt } = require('../utils/constants');
const messages = require('../utils/messages');
const User = require('../models/user');
const ConflictErr = require('../errors/conflict-err');

// создаёт пользователя с переданными в теле name, email, password
module.exports.signup = (req, res, next) => {
  const { name, email, password } = req.body;
  let userData = '';
  User.find({ email })
    .then((user) => { if (user.length > 0) { throw new ConflictErr(messages.userExists); } })
    .then(() => bcrypt.hash(password, Number(SALT_ROUNDS)))
    .then((hash) => User.create({ email, password: hash, name }))
    .then((user) => {
      userData = user;
      return jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' }); })
    .then((token) => res.cookie('jwt', token, {
      maxAge: 3600000 * 24 * 7,
      sameSite: 'None',
      secure: true, // закомментировать для работы Постмана
      httpOnly: true,
    }).send({ _id: userData._id, name: userData.name, email: userData.email }))
    .catch((err) => { next(err); });
};

// проверяет переданные в теле почту и пароль и возвращает JWT
module.exports.signin = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => { return jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' }); })
    .then((token) => {
      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        sameSite: 'None',
        secure: true, // закомментировать для работы Постмана
        httpOnly: true,
      }).send({ message: messages.signedIn });
    })
    .catch((err) => { next(err); });
};

// удаляет куку пользователя
module.exports.signout = (req, res) => {
  res.cookie('jwt', '', {
    expires: new Date(Date.now()),
    httpOnly: true,
  }).send({ message: messages.signedOut });
};
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
      // domain: 'bitfilms.nomoredomains.monster',
      secure: true,
      httpOnly: true,
    }).send({ _id: userData._id, name: userData.name, email: userData.email }))
    .catch((err) => { next(err); });
};

// проверяет переданные в теле почту и пароль и возвращает JWT
module.exports.signin = (req, res, next) => {
  const { email, password } = req.body;
  let userData = '';
  User.findUserByCredentials(email, password)
    .then((user) => {
      userData = user;
      return jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' }); })
    .then((token) => {
      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        sameSite: 'None',
        // domain: 'bitfilms.nomoredomains.monster',
        secure: true,
        httpOnly: true,
      }).send({ _id: userData._id, name: userData.name, email: userData.email });
      // console.log('*********************** cookie sent *******************************')
      // console.log('*********************** cookie sent *******************************')
      // console.log('*********************** cookie sent *******************************')
    })
    .catch((err) => { next(err); });
};

// удаляет куку пользователя
module.exports.signout = () => {
  // console.log('*********************** logged out *******************************')
  // console.log('*********************** logged out *******************************')
  // console.log('*********************** logged out *******************************')
  // res.cookie('jwt', '', {
  //   expires: new Date(Date.now()),
  //   httpOnly: true,
  // }).send({ message: messages.signedOut });
};

// проверяет куку пользователя
module.exports.authcheck = (req, res) => {
  // console.log('**************************** cookie check *************************************')
  // console.log('**************************** cookie check *************************************')
  // console.log('**************************** cookie check *************************************')
  // console.log(req)
  // console.log(JSON.parse(JSON.stringify(req.signedCookies)))
  const token = req.cookies.jwt;
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return res.send({ message: 'auth failed' });
  }
  res.send(payload);
};

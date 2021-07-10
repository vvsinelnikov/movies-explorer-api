const User = require('../models/user');
const messages = require('../utils/messages');
const NotFoundErr = require('../errors/not-found-err');

// возвращает информацию о пользователе (email и имя)
module.exports.getMyProfile = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) { throw new NotFoundErr(messages.userNotFound); }
      return res.send(user);
    })
    .catch((err) => { next(err); });
};

// обновляет информацию о пользователе (email и имя)
module.exports.updateMyProfile = (req, res, next) => {
  const { email, name } = req.body;
  User.findByIdAndUpdate(req.user._id, { email, name }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) { throw new NotFoundErr(messages.userNotFound); }
      return res.send(user);
    })
    .catch((err) => { next(err); });
};
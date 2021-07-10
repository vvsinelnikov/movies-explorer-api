const { JWT_SECRET, jwt } = require('../utils/constants');
const messages = require('../utils/messages');
const AuthRequiredErr = require('../errors/auth-required-err')

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    next(new AuthRequiredErr(messages.authRequired));
  }
  req.user = payload;
  next();
};

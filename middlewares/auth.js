const { JWT_SECRET, jwt } = require('../utils/constants');
const messages = require('../utils/messages');
const AuthRequiredErr = require('../errors/auth-required-err')

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new AuthRequiredErr(messages.authRequired));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return next(new AuthRequiredErr(messages.authRequired));
  }

  req.user = payload;

  next();
};

const messages = require('../utils/messages');

const errorSender = (err, req, res, next) => {
  const status = err.statusCode || 500;
  const message = err.message || messages.serverError;
  res.status(status).send({ err: message });
  return next();
}

module.exports = errorSender;
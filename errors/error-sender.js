const messages = require('../utils/messages');

const errorSender = (err, req, res, next) => {
  res.status(err.statusCode || 500).send({err: err.message || messages.serverError});
  return next();
}

module.exports = errorSender;
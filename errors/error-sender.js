const errorSender = (err, req, res, next) => {
  if (err.name === 'CastError') { return res.status(400).send({ message: err.message }); }
  if (err.name === 'ValidationError') { return res.status(400).send({ message: err.message }); }
  if (!err.statusCode) { err.statusCode = 500; }
  res.status(err.statusCode).send({ message: err.message });
  next()
}

module.exports = errorSender;
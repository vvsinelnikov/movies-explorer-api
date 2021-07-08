class NotFoundErr extends Error {
  constructor(message) {
    super(message || 'Не найдено');
    this.statusCode = 404;
  }
}

module.exports = NotFoundErr;

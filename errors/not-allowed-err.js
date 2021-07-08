class NotAllowed extends Error {
  constructor(message) {
    super(message || 'Недостаточно прав');
    this.statusCode = 403;
  }
}

module.exports = NotAllowed;

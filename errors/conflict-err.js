class ConflictErr extends Error {
  constructor(message) {
    super(message || 'Обнаружен конфликт');
    this.statusCode = 409;
  }
}

module.exports = ConflictErr;

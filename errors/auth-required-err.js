class AuthRequiredErr extends Error {
  constructor(message) {
    super(message || 'Необходима авторизация');
    this.statusCode = 401;
  }
}

module.exports = AuthRequiredErr;

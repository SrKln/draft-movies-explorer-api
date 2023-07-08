const { STATUS } = require('../constants');

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = STATUS.UNAUTHORIZED;
  }
}

module.exports = UnauthorizedError;

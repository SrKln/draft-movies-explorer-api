const { STATUS } = require('../constants');

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = STATUS.FORBIDDEN;
  }
}

module.exports = ForbiddenError;

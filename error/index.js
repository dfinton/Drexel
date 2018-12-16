const httpStatus = require('http-status');

class HttpError extends Error {
  constructor(code) {
    const statusNumber = httpStatus[code];

    super(httpStatus[`${statusNumber}_MESSAGE`]);

    this.statusNumber = statusNumber;
    this.code = code;
  }
}

class UnauthorizedError extends HttpError {
  constructor() {
    super('UNAUTHORIZED');
  }
}

class NotFoundError extends HttpError {
  constructor() {
    super('NOT_FOUND');
  }
}

module.exports.UnauthorizedError = UnauthorizedError;
module.exports.NotFoundError = NotFoundError;

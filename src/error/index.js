const httpStatus = require('http-status');

class HttpError extends Error {
  constructor(code) {
    const statusNumber = httpStatus[code];

    super(httpStatus[`${statusNumber}_MESSAGE`]);

    this.statusNumber = statusNumber;
    this.code = code;
  }
}

// Status 401
class UnauthorizedError extends HttpError {
  constructor() {
    super('UNAUTHORIZED');
  }
}

// Status 404
class NotFoundError extends HttpError {
  constructor() {
    super('NOT_FOUND');
  }
}

// Status 500
class InternalServerError extends HttpError {
  constructor() {
    super('INTERNAL_SERVER_ERROR');
  }
}

module.exports.UnauthorizedError = UnauthorizedError;
module.exports.NotFoundError = NotFoundError;
module.exports.InternalServerError = InternalServerError;

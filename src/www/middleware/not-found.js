const {NotFoundError} = require('../../error');

module.exports = (req, res, next) => {
  return next(new NotFoundError());
};

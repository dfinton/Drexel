const express = require('express');
const mongoose = require('mongoose');

const User = mongoose.model('User');
const router = express.Router();

class NotAuthorizedError extends Error {
  constructor(filename, lineNumber) {
    const message = "Not Authorized";

    super(message, filename, lineNumber);

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, NotAuthorizedError);
    }
  }
}

router.post('/', (req, res, next) => {
  const {
    login,
    password,
  } = req.body;

  const criteria = {
    login,
  };

  User.findOne(criteria, (err, user) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      return next(new NotAuthorizedError());
    }

    res.locals.user = user;
    res.locals.candidatePassword = password;

    return next();
  });
});

router.post('/', (req, res, next) => {
  const {
    user,
    candidatePassword,
  } = res.locals;

  user.comparePassword(candidatePassword, (err, isMatch) => {
    if (err) {
      return next(err);
    }

    if (!isMatch) {
      return next(new NotAuthorizedError());
    }

    return res.status(200).json({
      status: 'OK',
    });
  });
});

router.use((err, req, res, next) => {
  let status = 500;

  if (err instanceof NotAuthorizedError) {
    status = 401;
  }

  return res.status(status).json({
    status: err.message,
  });
});

module.exports = router;

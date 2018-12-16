const express = require('express');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const path = require('path');

const keyRouter = require('./key');

const User = mongoose.model('User');
const router = express.Router();

const {UnauthorizedError, InternalServerError} = require('../../error');

const dataMiddleware = require('../middleware/data');
const errorMiddleware = require('../middleware/error');
const notFoundMiddleware = require('../middleware/not-found');

// Handle sub-routes
router.use('/key', keyRouter);

// Handle our endpoint
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
      return next(new InternalServerError());
    }

    if (!user) {
      return next(new UnauthorizedError());
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
      return next(new InternalServerError());
    }

    if (!isMatch) {
      return next(new UnauthorizedError());
    }

    return next();
  });
});

router.post('/', (req, res, next) => {
  const keyPath = path.join(process.cwd(), 'private-rsa.key');

  fs.readFile(keyPath, 'utf8', (err, data) => {
    if (err) {
      return next(new InternalServerError());
    }

    res.locals.privateKey = data;

    return next();
  });
});

router.post('/', (req, res, next) => {
  const payload = {
    login: res.locals.user.login,
  };

  const options = {
    algorithm: 'RS256',
    expiresIn: '24h',
  };

  jwt.sign(payload, res.locals.privateKey, options, (err, token) => {
    if (err) {
      return next(new InternalServerError());
    }

    res.locals.data = {
      token,
    };

    return next();
  });
});

router.use(dataMiddleware);
router.use(notFoundMiddleware);
router.use(errorMiddleware);

module.exports = router;

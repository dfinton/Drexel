const express = require('express');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const path = require('path');

const keyRouter = require('./key');
const validateRouter = require('./validate');
const router = express.Router();

const User = mongoose.model('User');
const Session = mongoose.model('Session');

const {UnauthorizedError, InternalServerError} = require('../../error');

const dataMiddleware = require('../middleware/data');
const errorMiddleware = require('../middleware/error');
const notFoundMiddleware = require('../middleware/not-found');

// Handle sub-routes
router.use('/key', keyRouter);
router.use('/validate', validateRouter);

// Validate the login name exists in the database
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

// Validate the password is valid
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

// Clear any existing sessions in the database, if any
router.post('/', (req, res, next) => {
  const criteria = {
    userId: res.locals.user._id,
  };

  Session.deleteOne(criteria, (err) => {
    if (err) {
      return next(new InternalServerError());
    }

    return next();
  });
});

// Read in the private key to generate the token with
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

// Create the javascript web token
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

    res.locals.token = token;

    return next();
  });
});

// Create a new session with our user ID and new token
router.post('/', (req, res, next) => {
  const session = new Session({
    userId: res.locals.user._id,
    token: res.locals.token,
  });

  session.save((err) => {
    if (err) {
      return next(new InternalServerError());
    }

    return next();
  });
});

// Put together our data payload and send it off to the requestor
router.post('/', (req, res, next) => {
  const {
    token,
  } = res.locals;

  res.locals.data = {
    token,
  };

  return next();
});

router.use(dataMiddleware);
router.use(notFoundMiddleware);
router.use(errorMiddleware);

module.exports = router;

const express = require('express');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const path = require('path');

const router = express.Router();

const Session = mongoose.model('Session');
const User = mongoose.model('User');

const {
  UnauthorizedError,
  InternalServerError
} = require('../../error');

// Read the RSA public key for verification of the token
router.use((req, res, next) => {
  const keyPath = path.join(process.cwd(), 'public-rsa.key');

  fs.readFile(keyPath, 'utf8', (err, data) => {
    if (err) {
      return next(new InternalServerError());
    }

    res.locals.publicKey = data;

    return next();
  });
});

// Verify the token itself is valid
router.use((req, res, next) => {
  const {
    token,
    publicKey,
  } = res.locals;

  const options = {
    algorithms: [
      'RS256',
    ],
  };

  jwt.verify(token, publicKey, options, (err, decoded) => {
    if (err) {
      return next(new UnauthorizedError());
    }

    return next();
  });
});

// Verify the token is stored in a valid session
router.use((req, res, next) => {
  const {
    token,
  } = res.locals;

  const fields = {
    _id: false,
    userId: true,
    createdAt: true,
  };

  const criteria = {
    token,
  };

  Session
    .findOne()
    .select(fields)
    .where(criteria)
    .lean()
    .exec((err, session) => {
      if (err) {
        return next(new InternalServerError());
      }

      if (!session) {
        return next(new UnauthorizedError());
      }

      res.locals.session = session;

      return next();
    });
});

// Get the user from the database
router.use((req, res, next) => {
  const {
    session,
  } = res.locals;

  const fields = {
    _id: false,
    login: true,
    createdAt: true,
    updatedAt: true,
  };

  User
    .findById(session.userId)
    .select(fields)
    .exec((err, user) => {
      if (err) {
        return next(new InternalServerError());
      }

      if (!user) {
        return next(new UnauthorizedError());
      }

      res.locals.user = user;

      return next();
    });
});

module.exports = router;

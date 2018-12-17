const express = require('express');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const path = require('path');

const router = express.Router();

const Session = mongoose.model('Session');

const {UnauthorizedError, InternalServerError} = require('../../error');

const getTokenMiddleware = require('../middleware/get-token');

router.get('/', getTokenMiddleware);

router.get('/', (req, res, next) => {
  const keyPath = path.join(process.cwd(), 'public-rsa.key');

  fs.readFile(keyPath, 'utf8', (err, data) => {
    if (err) {
      return next(new InternalServerError());
    }

    res.locals.publicKey = data;

    return next();
  });
});

router.get('/', (req, res, next) => {
  const options = {
    algorithms: [
      'RS256',
    ],
  };

  jwt.verify(res.locals.token, res.locals.publicKey, options, (err, decoded) => {
    if (err) {
      return next(new UnauthorizedError());
    }

    return next();
  });
});

// Put together our data payload and send it off to the requestor
router.get('/', (req, res, next) => {
  const {
    token,
  } = res.locals;

  res.locals.data = {
    token,
  };

  return next();
});

module.exports = router;

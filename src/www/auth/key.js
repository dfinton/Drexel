const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

const {InternalServerError} = require('../../error');

router.get('/', (req, res, next) => {
  const keyPath = path.join(process.cwd(), 'public-rsa.key');

  fs.readFile(keyPath, 'utf8', (err, data) => {
    if (err) {
      return next(new InternalServerError());
    }

    res.locals.data = {
      publicKey: data,
    };

    return next();
  });
});

module.exports = router;

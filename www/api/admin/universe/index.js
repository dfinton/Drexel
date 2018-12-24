const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

const Universe = mongoose.model('Universe');

router.get('/', (req, res, next) => {
  res.locals.data = {
    Steven: "Universe",
  };

  return next();
});

module.exports = router;

const express = require('express');

const router = express.Router();

router.use((req, res, next) => {
  const token = req.get('token');

  res.locals.token = token;

  return next();
});

module.exports = router;

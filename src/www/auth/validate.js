const express = require('express');

const router = express.Router();

const getTokenMiddleware = require('../middleware/get-token');
const validateTokenMiddleware = require('../middleware/validate-token');

router.get('/', getTokenMiddleware);
router.get('/', validateTokenMiddleware);

// Put together our data payload and send it off to the requestor
router.use((req, res, next) => {
  const {
    token,
  } = res.locals;

  res.locals.data = {
    token,
  };

  return next();
});

module.exports = router;

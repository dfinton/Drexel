const express = require('express');

const dataMiddleware = require('../middleware/data');
const errorMiddleware = require('../middleware/error');
const notFoundMiddleware = require('../middleware/not-found');

const router = express.Router();

router.use('/admin', require('./admin'));

router.use(dataMiddleware);
router.use(notFoundMiddleware);
router.use(errorMiddleware);

module.exports = router;

const express = require('express');

const dataMiddleware = require('../middleware/data');
const errorMiddleware = require('../middleware/error');
const getTokenMiddleware = require('../middleware/get-token');
const notFoundMiddleware = require('../middleware/not-found');
const validateTokenMiddleware = require('../middleware/validate-token');

const router = express.Router();

router.use(getTokenMiddleware);
router.use(validateTokenMiddleware);

router.use('/admin', require('./admin'));

router.use(dataMiddleware);
router.use(notFoundMiddleware);
router.use(errorMiddleware);

module.exports = router;

const express = require('express');

const router = express.Router();

router.use('/universe', require('./universe'));

module.exports = router;

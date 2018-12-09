const express = require('express');

const router = express.Router();

router.post('/', (req, res) => {
  const login = req.body.login;
  const password = req.body.password;

  return res.json(login);
});

module.exports = router;

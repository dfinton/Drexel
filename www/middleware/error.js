module.exports = (err, req, res, next) => {
  const payload = {
    status: err.code,
    message: err.message,
  };

  return res.status(err.statusNumber).json(payload);
};

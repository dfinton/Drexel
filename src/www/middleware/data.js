module.exports = (req, res, next) => {
  const {
    data,
    meta,
  } = res.locals;

  if (!(data || meta)) {
    return next();
  }

  const payload = {
    data,
    meta,
    status: 'OK',
  };

  return res.json(payload);
};

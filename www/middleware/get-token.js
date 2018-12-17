module.exports = (req, res, next) => {
  const token = req.get('token');

  res.locals.token = token;

  return next();
};

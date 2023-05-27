module.exports = (error, req, res, next) => {
  const statusCode = res.statusCode || 500;
  res.status(statusCode);
  res.json({
    code: statusCode,
    stack: error.stack,
  });
};

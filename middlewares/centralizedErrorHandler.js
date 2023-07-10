const { MESSAGE } = require('../utils/constants');

const centralizedErrorHandler = (err, req, res, next) => {
  // если у ошибки нет статуса, выставляем 500
  const { statusCode = 500 } = err;
  const message = statusCode === 500 ? MESSAGE.SERVER_ERROR : err.message;
  res.status(statusCode).send({ message });
  next();
};

module.exports = centralizedErrorHandler;

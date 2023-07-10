require('dotenv').config();
const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000, DB_ADDRESS = 'mongodb://127.0.0.1:27017/bitfilmsdb' } = process.env;
const { limiterConfig } = require('./utils/config');

const { MESSAGE } = require('./utils/constants');

const app = express();
app.use(cors());

const router = require('./routes');
const centralizedErrorHandler = require('./middlewares/centralizedErrorHandler');

app.use(helmet());
const limiter = rateLimit(limiterConfig);

app.use(requestLogger); // подключаем логгер запросов

app.use(limiter);

app.use(express.json());

mongoose.connect(DB_ADDRESS);

app.use(router);

app.use(errorLogger); // подключаем логгер ошибок

app.use(errors());
app.use(centralizedErrorHandler);

app.listen(PORT, () => {
  console.log(MESSAGE.SERVER_IS_RUNNING); // eslint-disable-line no-console
});

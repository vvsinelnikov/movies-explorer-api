// *** Переменные окружения ***
const {
  PORT = 3000,
  MONGO_URL = 'mongodb://localhost:27017/bitfilmsdb',
  JWT_SECRET = 'vv-secret-key',
  SALT_ROUNDS = 8
// eslint-disable-next-line no-undef
} = process.env;

const express = require('express');
const app = express();

const mongoose = require('mongoose');
const helmet = require('helmet'); // установка 'безопасных' заголовков
const rateLimit = require('express-rate-limit'); // ограничение количества запросов
const bodyParser = require('body-parser'); // парсинг запросов
const cookieParser = require('cookie-parser'); // парсинг кук
const { celebrate, Joi, errors } = require('celebrate'); // валдация запросов
const bcrypt = require('bcryptjs'); // шифрование JWT
const jwt = require('jsonwebtoken'); // парсинг JWT
const validator = require('validator'); // валидация Mongo
const winston = require('winston'); // логгирование
const expressWinston = require('express-winston'); // логгирование

// *** Мидлвары ***
const errorSender = require('../errors/error-sender'); // обработка ошибок

module.exports = {
  PORT, MONGO_URL, JWT_SECRET, SALT_ROUNDS,
  app, mongoose,
  helmet, rateLimit,
  bodyParser, cookieParser,
  celebrate, Joi, errors,
  bcrypt, jwt,
  validator,
  winston, expressWinston,
  errorSender
}







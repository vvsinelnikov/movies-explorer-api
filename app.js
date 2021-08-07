require('dotenv').config();
const {
  PORT, MONGO_URL,
  app, mongoose,
  helmet, rateLimit,
  bodyParser, cookieParser,
  errorSender,
  errors
} = require('./utils/constants')
const { requestLogger, errorLogger } = require('./middlewares/logger'); // логгирование
const rateLimitSettings = require('./utils/rate-limit-settings')

mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

// *** Логгирование запросов в /request.log ***
app.use(requestLogger);

// *** Безопасность ***
app.use(helmet()); // установка 'безопасных' заголовков
const limiter = rateLimit(rateLimitSettings);
app.use(limiter);

// *** Парсинг запросов и кук ***
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// // *** Разрешаения CORS ***
const allowedCors = [
  'http://localhost:3000',
  'https://bitfilms.nomoredomains.monster',
];
app.options('*', (req, res) => {
  const { origin } = req.headers;
  if (allowedCors.includes(origin)) { res.header('Access-Control-Allow-Origin', origin); }
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, HEAD, PUT, PATCH, POST, DELETE');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.sendStatus(200);
});
app.use((req, res, next) => {
  const { origin } = req.headers;
  if (allowedCors.includes(origin)) { res.header('Access-Control-Allow-Origin', origin); }
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, HEAD, PUT, PATCH, POST, DELETE');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

// *** Роуты ***
app.use('/', require('./routes/index'));

// *** Централизованная обработка ошибок ***
app.use(errorLogger); // логгирование ошибок в /error.log
app.use(errors()); // обработка ошибок celebrate
app.use(errorSender); // вывод ошибок пользователю


app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

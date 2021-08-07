const { celebrate, Joi } = require('../utils/constants')
const { signup, signin, signout } = require('../controllers/auth'); // контроллеры регистрации и авторизации
const router = require('express').Router();
const auth = require('../middlewares/auth'); // аутентификация

const allowedCors = [
  'http://localhost:3000',
  'https://bitfilms.nomoredomains.monster',
];
router.options('*', (req, res) => {
  const { origin } = req.headers;
  if (allowedCors.includes(origin)) { res.header('Access-Control-Allow-Origin', origin); }
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, HEAD, PUT, PATCH, POST, DELETE');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.sendStatus(200);
});
router.use((req, res, next) => {
  const { origin } = req.headers;
  if (allowedCors.includes(origin)) { res.header('Access-Control-Allow-Origin', origin); }
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, HEAD, PUT, PATCH, POST, DELETE');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

router.use('/users', auth, require('../routes/users'));

router.use('/movies', auth, require('../routes/movies'));

router.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().required().min(2).max(30)
  }),
}), signup);

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), signin);

router.post('/signout', auth, signout);

router.use('/*', auth, require('../routes/unknown'));

module.exports = router;

const { celebrate, Joi } = require('../utils/constants')
const { signup, signin } = require('../controllers/auth'); // контроллеры регистрации и авторизации
const router = require('express').Router();
const auth = require('../middlewares/auth'); // аутентификация

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

router.use('/*', auth, require('../routes/unknown'));


module.exports = router;

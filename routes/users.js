const { celebrate, Joi } = require('../utils/constants')
const router = require('express').Router();
const { getMyProfile, updateMyProfile } = require('../controllers/users');

// возвращает информацию о пользователе (email и имя)
router.get('/me', getMyProfile);

// обновляет информацию о пользователе (email и имя)
router.patch('/me', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    name: Joi.string().required().min(2).max(30)
  }),
}), updateMyProfile);

module.exports = router;

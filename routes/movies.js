const { validator, celebrate, Joi } = require('../utils/constants')
const messages = require('../utils/messages');
const router = require('express').Router();
const { getLikedMovies, createMovie, deleteMovie } = require('../controllers/movies');
const regexp = require('../utils/regex');
Joi.objectId = require('joi-objectid')(Joi);

// возвращает все сохранённые пользователем фильмы
router.get('/', getLikedMovies);

// создаёт фильм с переданными в теле объектом фильма
router.post('/', celebrate({
  body: Joi.object().keys({
    created_at: Joi.date(),
    country: Joi.string().required().pattern(regexp.name),
    description: Joi.string().required().pattern(regexp.name),
    director: Joi.string().pattern(regexp.name),
    duration: Joi.number().required(),
    id: Joi.number().required(),
    image: Joi.object().required(),
    nameEN: Joi.string().required().pattern(regexp.nameEN),
    nameRU: Joi.string().required().pattern(regexp.nameRU),
    updated_at: Joi.date(),
    trailerLink: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message(messages.invalidUrl)
    }),
    year: Joi.number().required(),
  }),
}), createMovie);

// удаляет сохранённый фильм по id
router.delete('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.number()
  }),
}), deleteMovie);

module.exports = router;

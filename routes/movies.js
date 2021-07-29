const { validator, celebrate, Joi } = require('../utils/constants')
const messages = require('../utils/messages');
const router = require('express').Router();
const { getMyMovies, createMovie, deleteMovie } = require('../controllers/movies');
const regexp = require('../utils/regex');
Joi.objectId = require('joi-objectid')(Joi);

// возвращает все сохранённые пользователем фильмы
router.get('/', getMyMovies);

// создаёт фильм с переданными в теле country, director, duration, year, description, image, trailer, nameRU, nameEN и thumbnail, movieId
router.post('/', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required().pattern(regexp.name),
    director: Joi.string().required().pattern(regexp.name),
    duration: Joi.number().required(),
    // duration: Joi.number().required().pattern(regexp.time),
    // year: Joi.string().required().pattern(regexp.year),
    year: Joi.number().required(),
    description: Joi.string().required().pattern(regexp.name),
    // image: Joi.string().required().pattern(regexp.url),
    image: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message(messages.invalidUrl)
    }),
    trailer: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message(messages.invalidUrl)
    }),
    nameRU: Joi.string().required().pattern(regexp.nameRU),
    nameEN: Joi.string().required().pattern(regexp.nameEN),
    thumbnail: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message(messages.invalidUrl)
    }),
    movieId: Joi.number().required(),
  }),
}), createMovie);

// удаляет сохранённый фильм по id
router.delete('/:movieId', celebrate({
  params: Joi.object().keys({
    movieId: Joi.objectId()
  }),
}), deleteMovie);

module.exports = router;

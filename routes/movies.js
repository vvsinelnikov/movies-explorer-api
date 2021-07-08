const { celebrate, Joi } = require('../utils/constants')
const router = require('express').Router();
const { createMovie, deleteMovie } = require('../controllers/movies');
const regexp = require('../utils/regex');
Joi.objectId = require('joi-objectid')(Joi);

// создаёт фильм с переданными в теле country, director, duration, year, description, image, trailer, nameRU, nameEN и thumbnail, movieId
router.post('/', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required().pattern(regexp.name),
    director: Joi.string().required().pattern(regexp.name),
    duration: Joi.string().required().min(2).pattern(regexp.time),
    year: Joi.string().required().pattern(regexp.year),
    description: Joi.string().required().pattern(regexp.name),
    image: Joi.string().required().pattern(regexp.url),
    trailer: Joi.string().required().pattern(regexp.url),
    nameRU: Joi.string().required().pattern(regexp.nameRU),
    nameEN: Joi.string().required().pattern(regexp.nameEN),
    thumbnail: Joi.string().required().pattern(regexp.url),
    movieId: Joi.string().required().max(30),
  }),
}), createMovie);

// удаляет сохранённый фильм по id
router.delete('/:movieId', celebrate({
  params: Joi.object().keys({
    movieId: Joi.objectId()
  }),
}), deleteMovie);

module.exports = router;

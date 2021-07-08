const Movie = require('../models/movie');
const messages = require('../utils/messages');
const NotFoundErr = require('../errors/not-found-err');
const NotAllowed = require('../errors/not-allowed-err');

// создаёт фильм с переданными в теле country, director, duration, year, description, image, trailer, nameRU, nameEN и thumbnail, movieId
module.exports.createMovie = (req, res, next) => {
  const {
    country, director, duration, year, description, image, trailer, nameRU, nameEN, thumbnail, movieId
  } = req.body;
  Movie.create({ country, director, duration, year, description, image, trailer, nameRU, nameEN, thumbnail, movieId, owner: req.user._id })
    .then((movie) => { res.send(movie); })
    .catch((err) => { next(err); });
};

// удаляет сохранённый фильм по id
module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .then((movie) => {
      if (!movie) { throw new NotFoundErr(messages['movieNotFound']); }
      if (movie.owner.toString() !== req.user._id) { throw new NotAllowed(messages['unableToDelete']); }
      return Movie.findByIdAndRemove(req.params.movieId);
    })
    .then((movie) => { res.send(movie); })
    .catch((err) => { next(err); });
};

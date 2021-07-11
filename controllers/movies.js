const Movie = require('../models/movie');
const messages = require('../utils/messages');
const NotFoundErr = require('../errors/not-found-err');
const NotAllowed = require('../errors/not-allowed-err');
const ConflictErr = require('../errors/conflict-err');
const User = require('../models/user');

// возвращает все сохранённые пользователем фильмы
module.exports.getMyMovies = (req, res, next) => {
  Movie.find({})
    .populate('owner')
    .then((movies) =>  { res.send(movies.filter(movie => movie.owner._id.toString() === req.user._id)) })
    .catch((err) => { next(err); });
};

// создаёт фильм с переданными в теле country, director, duration, year, description, image, trailer, nameRU, nameEN и thumbnail, movieId
module.exports.createMovie = (req, res, next) => {
  const {
    country, director, duration, year, description, image, trailer, nameRU, nameEN, thumbnail, movieId
  } = req.body;
  Movie.findOne({movieId: movieId})
    .then((movie) => { if (movie) { throw new ConflictErr(messages.movieExists); }})
    .then(() => Movie.create({ country, director, duration, year, description, image, trailer, nameRU, nameEN, thumbnail, movieId, owner: req.user._id }) )
    .then((movie) => {
      res.send(movie);
      User.findByIdAndUpdate(req.user._id,
      { $addToSet: { movies: movie.movieId } },
      { new: true, runValidators: true });
    })
    .catch((err) => { next(err); });
};

// удаляет сохранённый фильм по id
module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .then((movie) => {
      if (!movie) { throw new NotFoundErr(messages.movieNotFound); }
      if (movie.owner.toString() !== req.user._id) { throw new NotAllowed(messages.unableToDelete); }
      return Movie.findByIdAndRemove(req.params.movieId);
    })
    .then((movie) => { res.send(movie); })
    .catch((err) => { next(err); });
};

const Movie = require('../models/movie');
const messages = require('../utils/messages');
const NotFoundErr = require('../errors/not-found-err');
const NotAllowed = require('../errors/not-allowed-err');
const ConflictErr = require('../errors/conflict-err');

// возвращает все сохранённые пользователем фильмы
module.exports.getLikedMovies = (req, res, next) => {
  Movie.find({})
    .populate('owner')
    .then((movies) =>  { res.send(movies.filter(movie => movie.owner._id.toString() === req.user._id)) })
    .catch((err) => { next(err); });
};

// создаёт фильм
module.exports.createMovie = (req, res, next) => {
  const movie = req.body;
  Movie.findOne({id: movie.id, owner: req.user._id})
    .then((movie) => {
      if (movie) { throw new ConflictErr(messages.movieExists); }})
    .then(() => Movie.create({...movie, owner: req.user._id }) )
    .then((movie) => { res.send(movie) })
    .catch((err) => { next(err); });
};

// удаляет сохранённый фильм по id
module.exports.deleteMovie = (req, res, next) => {
  Movie.findOne({id: req.params.id})
    .then((movie) => {
      if (!movie) { throw new NotFoundErr(messages.movieNotFound); }
      if (movie.owner.toString() !== req.user._id) { throw new NotAllowed(messages.unableToDelete); }
      return Movie.findByIdAndRemove(movie._id);
    })
    .then((movie) => { res.send(movie); })
    .catch((err) => { next(err); });
};

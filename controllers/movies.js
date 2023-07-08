const { Error } = require('mongoose');
const Movie = require('../models/movie');
const { STATUS } = require('../utils/constants');
const ForbiddenError = require('../utils/errors/ForbiddenError');
const NotFoundError = require('../utils/errors/NotFoundError');
const BadRequestError = require('../utils/errors/BadRequestError');

const getMovies = (req, res, next) => {
  Movie.find({})
    .populate('owner')
    .then((movies) => res.status(STATUS.OK).send(movies))
    .catch(next);
};

const deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError('Фильм не найден');
      }
      if (Movie.owner.toString() !== req.user._id.toString()) {
        throw new ForbiddenError('Недостаточно прав');
      }
      return Movie.deleteOne();
    })
    .then(() => res.send({ message: 'Фильм удален' }))
    .catch((err) => {
      if (err instanceof Error.CastError) {
        return next(new BadRequestError('Перезаполните данные'));
      }
      return next(err);
    });
};

const addMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;

  return Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner: req.user._id,
  })
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err instanceof Error.ValidationError) {
        return next(new BadRequestError('Перезаполните данные'));
      }
      return next(err);
    });
};

module.exports = {
  getMovies,
  addMovie,
  deleteMovie,
};

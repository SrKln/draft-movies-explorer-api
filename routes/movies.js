const router = require('express').Router();
const {
  getMovies,
  addMovie,
  deleteMovie,
} = require('../controllers/movies');

const {
  movieValidator, movieIdValidator,
} = require('../middlewares/validation');

router.get('/', getMovies);
router.post('/', movieValidator, addMovie);
router.delete('/:movieId', movieIdValidator, deleteMovie);

module.exports = router;

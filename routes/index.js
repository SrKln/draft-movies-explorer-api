const router = require('express').Router();
const { MESSAGE } = require('../utils/constants');

const userRouter = require('./users');
const moviesRouter = require('./movies');
const { login, createUser } = require('../controllers/users');
const auth = require('../middlewares/auth');
const {
  signinValidator, signupValidator,
} = require('../middlewares/validation');

const NotFoundError = require('../utils/errors/NotFoundError');

router.post('/signin', signinValidator, login);
router.post('/signup', signupValidator, createUser);

router.use('/users', auth, userRouter);
router.use('/movies', auth, moviesRouter);
router.use('/', auth, (req, res, next) => {
  next(new NotFoundError(MESSAGE.PAGE_NOT_FOUND));
});

module.exports = router;

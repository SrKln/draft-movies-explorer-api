const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Error } = require('mongoose');
const User = require('../models/user');
const { STATUS, MESSAGE } = require('../utils/constants');
const BadRequestError = require('../utils/errors/BadRequestError');
const ConflictError = require('../utils/errors/ConflictError');
const NotFoundError = require('../utils/errors/NotFoundError');

const { NODE_ENV, JWT_SECRET } = process.env;

const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key', { expiresIn: '7d' });
      res.send({ token });
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  const {
    name,
    email,
    password,
  } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({
      name,
      email,
      password: hash,
    }))
    .then((user) => res.status(STATUS.CREATED)
      .send({
        name: user.name,
        email: user.email,
        _id: user._id,
      }))
    .catch((err) => {
      if (err instanceof Error.ValidationError) {
        return next(new BadRequestError(MESSAGE.INCORRECT_USER_DATA));
      }
      if (err.code === 11000) {
        return next(new ConflictError(MESSAGE.EMAIL_ALREADY_REGISTERED));
      }
      return next(err);
    })
    .catch(next);
};

const updateUser = (req, res, updateData, next) => {
  const userId = req.user._id;
  User.findByIdAndUpdate(userId, updateData, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError(MESSAGE.USER_NOT_FOUND);
      } else {
        res.send(user);
      }
    })
    .catch((err) => {
      if (err instanceof Error.ValidationError) {
        return next(new BadRequestError(MESSAGE.REFILL_THE_DATA));
      }
      return next(err);
    });
};

const updateProfUser = (req, res) => {
  const { name, email } = req.body;
  updateUser(req, res, { name, email });
};

const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        res.status(STATUS.NOT_FOUND).send({ message: MESSAGE.USER_NOT_FOUND });
      } else {
        res.send(user);
      }
    })
    .catch((err) => {
      if (err instanceof Error.CastError) {
        return next(new BadRequestError(MESSAGE.INCORRECT_SEARCH_DATA));
      }
      return next(err);
    });
};

module.exports = {
  createUser,
  updateProfUser,
  login,
  getCurrentUser,
};

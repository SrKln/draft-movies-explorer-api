const STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  SERVER_ERROR: 500,
};

const MESSAGE = {
  PAGE_NOT_FOUND: 'Страница не найдена',
  INCORRECT_PASS_OR_EMAIL: 'Неправильные почта или пароль',
  SERVER_ERROR: 'На сервере произошла ошибка',
  AUTHORIZATION_REQUIRED: 'Необходима авторизация',
  USER_NOT_FOUND: 'Пользователь не найден',
  REFILL_THE_DATA: 'Перезаполните данные',
  EMAIL_ALREADY_REGISTERED: 'Пользователь с таким email уже зарегистрирован',
  INCORRECT_USER_DATA: 'Переданы некорректные данные при создании пользователя.',
  INCORRECT_SEARCH_DATA: 'Введены некорректные данные поиска',
  FILM_NOT_FOUND: 'Фильм не найден',
  NOT_ENOUGH_RIGHTS: 'Недостаточно прав',
  FILM_DELETE: 'Фильм удален',
  SERVER_IS_RUNNING: 'Сервер запущен',
};

const urlRegExp = /^https?:\/\/(www\.)?[-a-zA-Z0-9.]{2,255}\.[a-z]{2,11}([-a-zA-Z0-9._~:/?#[\]@!$&'()*+,;=]+)#?$/;

module.exports = {
  STATUS,
  urlRegExp,
  MESSAGE,
};

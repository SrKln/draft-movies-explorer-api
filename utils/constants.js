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

const urlRegExp = /^https?:\/\/(www\.)?[-a-zA-Z0-9.]{2,255}\.[a-z]{2,11}([-a-zA-Z0-9._~:/?#[\]@!$&'()*+,;=]+)#?$/;

module.exports = {
  STATUS,
  urlRegExp,
};

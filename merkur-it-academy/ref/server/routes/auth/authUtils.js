const { createHash } = require('crypto');

const AUTH_SALT = 'merkur-it-academy-auth-salt';
const AUTH_COOKIE_SALT = 'e6701c92-27af-5305-92b6-cd1276ad635c';
const AUTH_COOKIE = 'merkur-it-academy-auth';

function createAuthCookieValue(username) {
  return createHash('sha3-512')
    .update(`${AUTH_COOKIE_SALT}_${username}`)
    .digest('base64');
}

function encryptPassword(password) {
  return createHash('sha3-512')
    .update(`${AUTH_SALT}_${password}`)
    .digest('base64');
}

function createAuthCookie(username) {
  const oneDay = 1000 * 60 * 60 * 24;
  const cookieValue = createAuthCookieValue(username);

  return [
    AUTH_COOKIE,
    cookieValue,
    {
      expires: new Date(Date.now() + oneDay),
      httpOnly: true,
      sameSite: 'lax',
    },
  ];
}

module.exports = {
  AUTH_COOKIE,
  AUTH_COOKIE_SALT,
  AUTH_SALT,
  createAuthCookie,
  createAuthCookieValue,
  encryptPassword,
};

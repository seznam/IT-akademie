const express = require('express');

const {
  AUTH_COOKIE,
  createAuthCookie,
  createAuthCookieValue,
  encryptPassword,
} = require('./authUtils');

const UserDB = require('../../mocks/users.json');

const router = express.Router();

function userResponse(res, user) {
  const userCopy = { ...user };
  delete userCopy.password;

  return res
    .status(200)
    .cookie(...createAuthCookie(user.username))
    .json({
      data: {
        user: userCopy,
      },
    });
}

router
  .post('/login', async (req, res) => {
    try {
      const { username, password } = req?.body ?? {};

      if (!username || !password) {
        return res
          .status(400)
          .json({ message: 'Either password or username is invalid.' });
      }

      const user = UserDB[username];

      if (!user) {
        return res
          .status(400)
          .json({ message: `User with '${username}' not found.` });
      }

      if (encryptPassword(password) !== user.password) {
        return res.status(400).json({ message: 'Invalid password.' });
      }

      return userResponse(res, user);
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  })
  .get('/check', async (req, res) => {
    try {
      const cookies = req.cookies;

      if (!cookies) {
        return res
          .status(401)
          .json({ message: 'Received empty cookies with user request.' });
      }

      const authCookie = cookies[AUTH_COOKIE];

      if (!authCookie) {
        return res
          .status(401)
          .json({ message: 'No auth cookie present on user request.' });
      }

      const username = Object.keys(UserDB).find(
        (username) => authCookie === createAuthCookieValue(username)
      );

      if (!username) {
        return res.status(401).json({ message: 'Invalid auth cookie.' });
      }

      return userResponse(res, UserDB[username]);
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  })
  .get('/logout', async (req, res) => {
    res.status(200).clearCookie(AUTH_COOKIE).json({});
  });

module.exports = () => ({ router });

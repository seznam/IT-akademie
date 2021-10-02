const express = require('express');

const {
  AUTH_COOKIE,
  createAuthCookie,
  createAuthCookieValue,
  encryptPassword,
} = require('./authUtils');

const UserDB = require('../../mocks/users.json');

const router = express.Router();

router
  .get('/login', async (req, res) => {
    try {
      res.json({
        login: '/login',
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  })
  .get('/check', async (req, res) => {
    try {
      res.json({
        check: '/check',
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  })
  .get('/logout', async (req, res) => {
    try {
      res.json({
        logout: '/logout',
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  });

module.exports = () => ({ router });

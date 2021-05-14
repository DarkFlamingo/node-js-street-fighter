const { Router } = require('express');
const AuthService = require('../services/authService');
const { responseMiddleware } = require('../middlewares/response.middleware');

const router = Router();

router.post(
  '/login',
  (req, res, next) => {
    try {
      // TODO: Implement login action (get the user if it exist with entered credentials)
      const data = req.body;
      const user = AuthService.login(data);
      if (!user) {
        throw { msg: 'User not found', status: 404 };
      }
      res.data = user;
    } catch (err) {
      res.err = { msg: 'User not found', status: 404 };
    } finally {
      next();
    }
  },
  responseMiddleware
);

module.exports = router;

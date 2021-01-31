const express = require('express');
const router = express.Router();

const authController = require('./authController');

router.post(
  '/registration',
  authController.validateAuth,
  authController.registrationController
);

router.post(
  '/login',
  authController.validateAuth,
  authController.loginController
);

router.post(
  '/logout',
  authController.authorize,
  authController.logoutController
);

router.post('/refresh', authController.refreshToken);

module.exports = router;

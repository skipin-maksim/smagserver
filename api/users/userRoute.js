const { Router } = require('express');

const authController = require('./authController');

const UserRouter = Router();

UserRouter.get('/users', authController.getUsersController);

UserRouter.get('/current', authController.authorize, authController.current);

module.exports = UserRouter;

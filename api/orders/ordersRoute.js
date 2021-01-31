const express = require('express');
const router = express.Router();
const OrdersController = require('./ordersController');
const AuthController = require('../users/authController');

router.get('/orders', AuthController.authorize, OrdersController.get);

router.get('/orders/:id', OrdersController.getById);

router.post('/orders', AuthController.authorize, OrdersController.create);

router.patch('/orders/:id', OrdersController.update);

router.delete('/orders/:id', OrdersController.remove);

module.exports = router;

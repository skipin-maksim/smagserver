const express = require('express');
const router = express.Router();
const ProductsController = require('./productsController');

router.get('/products', ProductsController.get);

router.get('/products/:id', ProductsController.getById);

router.post('/products', ProductsController.create);

router.patch('/products/:id', ProductsController.update);

router.delete('/products/:id', ProductsController.remove);

module.exports = router;

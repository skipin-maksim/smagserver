const express = require("express");
const router = express.Router();
const OrdersController = require("./ordersController");

router.get("/orders", OrdersController.get);

router.get("/orders/:id", OrdersController.getById);

router.post("/orders", OrdersController.create);

router.patch("/orders/:id", OrdersController.update);

router.delete("/orders/:id", OrdersController.remove);

module.exports = router;

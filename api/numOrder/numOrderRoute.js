const express = require("express");
const router = express.Router();
const NumOrderController = require("./numOrderController");

router.get("/numorder", NumOrderController.get);

router.patch("/numorder/:id", NumOrderController.update);

module.exports = router;

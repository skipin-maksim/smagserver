const express = require("express");
const router = express.Router();
const ClientsController = require("./clientsController");

router.get("/clients", ClientsController.get);

router.get("/clients/:id", ClientsController.getById);

router.post("/clients", ClientsController.create);

router.patch("/clients/:id", ClientsController.update);

router.delete("/clients/:id", ClientsController.remove);

module.exports = router;

const express = require("express");
const router = express.Router();
const deliverersController = require("../Controllers/deliverersController");

router.get("/", deliverersController.getAllDeliverers);

router.get("/:id", deliverersController.getDeliveryManById);

router.put("/:id", deliverersController.updateDeliveryMan);

module.exports = router;
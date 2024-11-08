const express = require("express");
const router = express.Router();
const deliverersController = require("../Controllers/deliverersController");

// Получить всех доставщиков
router.get("/", deliverersController.getAllDeliverers);

// Получить доставщика по ID
router.get("/:id", deliverersController.getDeliveryManById);

// Обновить доставщика по ID
router.put("/:id", deliverersController.updateDeliveryMan);

module.exports = router;
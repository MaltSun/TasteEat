const express = require("express");
const router = express.Router();
const customersController = require("../Controllers/customerController");

// Получить всех клиентов
router.get("/", customersController.getAllCustomers);

// Получить клиента по ID
router.get("/:id", customersController.getUserById);

// Обновить клиента по ID
router.put("/:id", customersController.updateUser);

module.exports = router;

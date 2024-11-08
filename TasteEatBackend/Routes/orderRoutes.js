const express = require("express");
const router = express.Router();
const orderController = require("../Controllers/orderController");

// Создание заказа
router.post("/", orderController.createOrder);

// Получить все заказы
router.get("/", orderController.getAllOrders);

// Получить заказ по ID
router.get("/:id", orderController.getOrderById);

// Обновить заказ
router.put("/:id", orderController.updateOrder);

// Удалить заказ
router.delete("/:id", orderController.deleteOrder);

// Принять заказ
router.put("/accept/:id", orderController.acceptOrder);

// Завершить заказ
router.put("/complete/:id", orderController.completeOrder);

// Получить завершенные заказы для конкретного клиента
router.get("/completed/customer/:customerId", orderController.getCompletedOrdersByCustomerId);

// Получить завершенные заказы для конкретного доставщика
router.get("/completed/deliverer/:delivererId", orderController.getCompletedOrdersByDelivererId);

module.exports = router;
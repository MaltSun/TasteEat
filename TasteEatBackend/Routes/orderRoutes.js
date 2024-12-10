const express = require("express");
const router = express.Router();
const orderController = require("../Controllers/orderController");

// Создание заказа
router.post("/", orderController.createOrder);

// Получить все заказы
router.get("/", orderController.getAllOrders);

router.get("/:id", orderController.getOrderById);

router.get("/active/:deliveryId", orderController.getOrdersByDeliveryId);

// Обновить заказ
//router.put("/:id", orderController.updateOrder);

// Удалить заказ
router.delete("/:id", orderController.deleteOrder);

// Принять заказ
router.patch("/accept/:id/:delivererId", orderController.acceptOrder);

// Завершить заказ
router.patch("/complete/:id", orderController.completeOrder);

router.get("/completed/customer/:customerId", orderController.getCompletedOrdersByCustomerId);

router.get("/uncompleted/customer/:customerId", orderController.getNotCompletedOrdersByCustomerId);

router.get("/completed/deliverer/:delivererId", orderController.getCompletedOrdersByDelivererId);

router.get("/current/deliverer/", orderController.getCurrentOrdersByDelivererId);

router.get("/active/:delivererId", orderController.getActiveOrdersByDelivererId);

module.exports = router;
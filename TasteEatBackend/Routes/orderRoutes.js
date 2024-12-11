const express = require("express");
const router = express.Router();
const orderController = require("../Controllers/orderController");

// Создание заказа
router.post("/", orderController.createOrder);

// Получить все заказы
router.get("/", orderController.getAllOrders);

router.get("/:id", orderController.getOrderById);

router.get("/active/:deliveryId", orderController.getOrdersByDeliveryId);


router.patch("/delete/:id", orderController.deleteOrder);

router.patch("/accept/:id/:delivererId", orderController.acceptOrder);

router.patch("/complete/:id", orderController.completeOrder);


router.get("/completed/customer/:customerId", orderController.getCompletedOrdersByCustomerId);

router.get("/uncompleted/customer/:customerId", orderController.getNotCompletedOrdersByCustomerId);

router.get("/completed/deliverer/:delivererId", orderController.getCompletedOrdersByDelivererId);

router.get("/current/deliverer/", orderController.getCurrentOrdersByDelivererId);

router.get("/active/:delivererId", orderController.getActiveOrdersByDelivererId);

module.exports = router;
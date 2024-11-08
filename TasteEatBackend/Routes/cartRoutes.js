const express = require("express");
const router = express.Router();
const cartController = require("../Controllers/cartController");

router.get("/", cartController.getAllCartItems);

router.post("/add", cartController.addToCart);

router.delete("/remove/:customerId/:dishId", cartController.removeFromCart);

router.get("/:customerId", cartController.getCartItems);

router.post("/checkout", cartController.checkout);

module.exports = router;
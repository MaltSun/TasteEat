const express = require("express");
const router = express.Router();
const customersController = require("../Controllers/customerController");

router.get("/", customersController.getAllCustomers);

router.get("/:id", customersController.getUserById);

router.put("/:id", customersController.updateUser);

module.exports = router;

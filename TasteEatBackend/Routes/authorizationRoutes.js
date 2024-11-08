const express = require("express");
const router = express.Router();
const authController = require("../Controllers/authorizateController");

// Регистрация пользователя
router.post("/register", authController.registrateUser);

// Авторизация пользователя
router.post("/login", authController.authorizateUser);

module.exports = router;
const Customer = require("../Models/customers");
const Deliverer = require("../Models/deliverers");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

exports.registrateUser = async (req, res) => {
  console.log("Полученные данные:", req.body);
  try {
    let { username, password, role, email } = req.body;

    if (
      !username ||
      !password ||
      !email ||
      !["customer", "deliverer"].includes(role)
    ) {
      console.log("Ошибка валидации данных");
      return res
        .status(400)
        .json({ error: "Все поля обязательны для заполнения" });
    }

    let user;
    if (role === "customer") {
      user = await Customer.findOne({ where: { username } });
    } else if (role === "deliverer") {
      user = await Deliverer.findOne({ where: { username } });
    }

    if (user) {
      console.log("Пользователь уже существует");
      return res.status(400).json({ error: "Пользователь уже существует" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    let newUser;
    if (role === "customer") {
      role == "user";
      newUser = await Customer.create({
        username,
        password: hashedPassword,
        role,
        email,
      });
    } else if (role === "deliverer") {
      newUser = await Deliverer.create({
        username,
        password: hashedPassword,
        email,
      });
    }

    res.status(201).json({ id: newUser.id, username: newUser.username, email });
  } catch (error) {
    console.error("Ошибка при регистрации:", error);
    res
      .status(500)
      .json({ error: "Внутренняя ошибка сервера", details: error.message });
  }
};

exports.authorizateUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    let role;
    let user = await Customer.findOne({ where: { email } });

    if (user) {
      role = "customer";
      if (user.role == "admin") {
        role = "admin";
      }
    } else {
      user = await Deliverer.findOne({ where: { email } });
      if (user) {
        role = "deliverer";
      }
    }

    if (!user) {
      return res.status(404).json({ error: "Пользователь не найден" });
    }

    // const isPasswordValid = await bcrypt.compare(password, user.password);
    if (password !== user.password) {
      return res.status(401).json({ error: "Неверные учетные данные" });
    }

    const token = jwt.sign({ id: user.id }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ token, user: { id: user.id, username: user.username, role } });
  } catch (error) {
    console.error("Ошибка авторизации:", error);
    res
      .status(500)
      .json({ error: "Внутренняя ошибка сервера", details: error.message });
  }
};

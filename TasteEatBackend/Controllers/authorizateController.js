const Customer = require("../Models/customers");
const Deliverer = require("../Models/deliverers");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Joi = require("joi");

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

exports.registrateUser = async (req, res) => {
  console.log("Полученные данные:", req.body);
  try {
    let { username, password, role, email } = req.body;

    if (
      !username ||
      !password ||
      !email ||
      !["customer", "deliverer", "user"].includes(role)
    ) {
      console.log("Ошибка валидации данных");
      return res
        .status(400)
        .json({ error: "Все поля обязательны для заполнения" });
    }

    let user;

    if (role === "customer" || role === "user") {
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

    const dbRole = role === "customer" || role === "user" ? "user" : role;

    if (dbRole === "user") {
      newUser = await Customer.create({
        username,
        password: hashedPassword,
        role: dbRole,
        email,
      });
    } else if (dbRole === "deliverer") {
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

const schema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

exports.authorizateUser = async (req, res) => {
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    const { email, password } = req.body;
    let user = await Customer.findOne({ where: { email } });

    if (!user) {
      user = await Deliverer.findOne({ where: { email } });
    }

    if (!user) {
      return res.status(404).json({ error: "Пользователь не найден" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Неверные учетные данные" });
    }

    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({
      token,
      user: { id: user.id, username: user.username, role: user.role },
    });
  } catch (error) {
    console.error("Ошибка авторизации:", error);
    res
      .status(500)
      .json({ error: "Внутренняя ошибка сервера", details: error.message });
  }
};

exports.changePassword = async (req, res) => {
  const { id, role, oldPassword, newPassword } = req.body;
 let user;
  if (role === "user" || role === "admin") {
     user = await Customer.findOne({ where: { id } });
    if (!user) {
      return res.status(404).json({ error: "Пользователь не найден" });
    }
  } else {
    user = await Deliverer.findOne({ where: { id } });
    if (!user) {
      return res.status(404).json({ error: "Пользователь не найден" });
    }
  }

  const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ error: "Старый пароль неверен" });
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  user.password = hashedPassword;
  await user.save();

  res.json({ message: "Пароль успешно изменен" });
};

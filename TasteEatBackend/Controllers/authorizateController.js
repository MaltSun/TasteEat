const Customer = require("../Models/customers"); 
const Deliverer = require("../Models/deliverers"); 
const bcrypt = require("bcrypt"); 
const jwt = require("jsonwebtoken"); 

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret"; 

exports.registrateUser = async (req, res) => {
  try {
    const { name, password, role } = req.body; 
    let user;
    if (role === "customer") {
      user = await Customer.findOne({ where: { name } });
    } else if (role === "deliverer") {
      user = await Deliverer.findOne({ where: { name } });
    }

    if (user) return res.status(400).json({ error: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    let newUser;
    if (role === "customer") {
      newUser = await Customer.create({ name, password: hashedPassword });
    } else if (role === "deliverer") {
      newUser = await Deliverer.create({ name, password: hashedPassword });
    }

    res.status(201).json({ id: newUser.id, name: newUser.name, role });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.authorizateUser = async (req, res) => {
  try {
    const { name, password, role } = req.body; 

    let user;
    if (role === "customer") {
      user = await Customer.findOne({ where: { name } });
    } else if (role === "deliverer") {
      user = await Deliverer.findOne({ where: { name } });
    }

    if (!user) return res.status(404).json({ error: "User not found" });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: user.id, role }, JWT_SECRET, { expiresIn: '1h' });

    res.json({ token, user: { id: user.id, name: user.name, role } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
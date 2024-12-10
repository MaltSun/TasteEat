// server.js
const express = require("express");
const dishRoutes = require("./Routes/dishRoutes");
const reviewRoutes = require("./Routes/reviewRoutes");
const orderRoutes = require("./Routes/orderRoutes");
const cartRoutes = require("./Routes/cartRoutes");
const deliverersRoutes = require("./Routes/deliverersRoutes");
const customerRoutes = require("./Routes/customerRoutes");
const authorizationRoutes = require("./Routes/authorizationRoutes");
const cors = require('cors'); 

const app = express();
const { Sequelize } = require("sequelize");
const PORT = process.env.PORT || 3000;

const sequelize = new Sequelize(
  "TasteEat",
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: "localhost",
    dialect: "postgres",
  }
);

app.use(cors({
  origin: 'http://localhost:5173', 
  methods: ['GET', 'POST', 'PUT','PATCH', 'DELETE'], 
  credentials: true 
}));

app.use((req, res, next) => {
  console.log(`${req.method} request for '${req.url}'`);
  next(); // Передаем управление следующему обработчику
});

app.use(express.json());
app.use("/api/dish", dishRoutes);
app.use("/api/review", reviewRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/deliverers", deliverersRoutes);
app.use("/api/customer", customerRoutes);
app.use("/api/authorization", authorizationRoutes);

app.options('*', cors());

sequelize
  .authenticate()
  .then(() =>
    console.log("Connection to the database has been established successfully.")
  )
  .catch((err) => console.error("Unable to connect to the database:", err));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const Order = require("../Models/orders");
const OrderDish = require("../Models/orderDish");
const Dish = require("../Models/dishes");

// Функция для создания заказа
exports.createOrder = async (req, res) => {
  try {
    const { customerId, address, comment, dishItems } = req.body;

    const order = await Order.create({
      customerId,
      address,
      comment, // исправлено с "coment" на "comment"
      status: "pending",
    });

    for (const item of dishItems) {
      await OrderDish.create({
        orderId: order.id,
        dishId: item.dishId,
        quantity: item.quantity,
      });
    }

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Функция для получения всех заказов
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      include: [
        {
          model: Dish,
          through: {
            model: OrderDish,
            attributes: ["quantity"],
          },
        },
      ],
    });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Функция для получения заказа по ID
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id, {
      include: [
        {
          model: Dish,
          through: {
            model: OrderDish,
            attributes: ["quantity"],
          },
        },
      ],
    });
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Функция для обновления заказа
exports.updateOrder = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    await order.update(req.body);

    const { dishItems } = req.body;
    if (dishItems) {
      await OrderDish.destroy({ where: { orderId: order.id } });
      for (const item of dishItems) {
        await OrderDish.create({
          orderId: order.id,
          dishId: item.dishId,
          quantity: item.quantity,
        });
      }
    }

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Функция для удаления заказа
exports.deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    await order.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Пример функции для принятия заказа
exports.acceptOrder = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    order.status = "accepted";
    await order.save();
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Пример функции для завершения заказа
exports.completeOrder = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    order.status = "completed";
    await order.save();
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Пример функций для получения завершенных заказов
exports.getCompletedOrdersByCustomerId = async (req, res) => {
  // Реализуйте эту функцию в зависимости от вашей логики
};

exports.getCompletedOrdersByDelivererId = async (req, res) => {
  // Реализуйте эту функцию в зависимости от вашей логики
};
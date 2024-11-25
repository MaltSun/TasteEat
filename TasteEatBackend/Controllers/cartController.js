const Cart = require("../Models/cart");
const Dish = require("../Models/dishes");

exports.getAllCartItems = async (req, res) => {
  try {
   
    const cartItems = await Cart.findAll();

    if (cartItems.length === 0) {
      return res.status(404).json({ message: "No items found in the cart." });
    }

    res.status(200).json(cartItems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.addToCart = async (req, res) => {
  try {
    const { customerId, dishId, quantity } = req.body;

    const dish = await Dish.findByPk(dishId);
    if (!dish) {
      return res.status(404).json({ error: "Dish not found" });
    }

    const existingCartItem = await Cart.findOne({
      where: { customerId, dishId },
    });

    if (existingCartItem) {
      existingCartItem.quantity += quantity; 
      await existingCartItem.save();
      return res.status(200).json(existingCartItem);
    } else {

      const cartItem = await Cart.create({ customerId, dishId, quantity });
      return res.status(201).json(cartItem);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    const { customerId, dishId } = req.params;

    const cartItem = await Cart.findOne({ where: { customerId, dishId } });
    if (!cartItem) {
      return res.status(404).json({ error: "Cart item not found" });
    }

    await cartItem.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCartItems = async (req, res) => {
  try {
    const { customerId } = req.params;

    const cartItems = await Cart.findAll({ where: { customerId } });
    res.status(200).json(cartItems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.checkout = async (req, res) => {
  try {
    const { customerId } = req.params;
    
    await Cart.destroy({ where: { customerId } });

    res.status(200).json({ message: "Checkout successful, cart cleared." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

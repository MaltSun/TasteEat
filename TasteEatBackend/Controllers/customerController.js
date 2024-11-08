const Customer = require("../Models/customers");

exports.getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.findAll();
    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const customer = await Customer.findByPk(req.params.id);
    if (!customer) return res.status(404).json({ error: "User not found" });
    res.json(customer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const customer = await Customer.findByPk(req.params.id);
    if (!customer) return res.status(404).json({ error: "User not found" });
    await customer.update(req.body);
    res.status(200).json(customer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

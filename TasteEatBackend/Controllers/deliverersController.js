const Deliverers = require("../Models/deliverers");

exports.getAllDeliverers = async (req, res) => {
  try {
    const deliveryMan = await Deliverers.findAll();
    res.status(200).json(deliveryMan);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getDeliveryManById = async (req, res) => {
  try {
    const deliveryMan = await Deliverers.findByPk(req.params.id);
    if (!deliveryMan) return res.status(404).json({ error: "User not found" });
    res.json(deliveryMan);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateDeliveryMan = async (req, res) => {
  try {
    const deliveryMan = await Deliverers.findByPk(req.params.id);
    if (!deliveryMan) return res.status(404).json({ error: "User not found" });
    await deliveryMan.update(req.body);
    res.status(200).json(deliveryMan);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

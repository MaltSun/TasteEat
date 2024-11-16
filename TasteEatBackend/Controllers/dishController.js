// controllers/dishController.js
const Dish = require("../Models/dishes");

exports.getAllDishes = async (req, res) => {
  try {
    const dishes = await Dish.findAll(); 
    res.status(200).json(dishes); 
  } catch (error) {
    res.status(500).json({ error: error.message }); 
  }
};

exports.createDish = async (req, res) => {
  try {
    const newDish = await Dish.create(req.body);
    res.status(201).json(newDish);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getDishById = async (req, res) => {
  try {
    const dish = await Dish.findByPk(req.params.id);
    if (!dish) return res.status(404).json({ error: "Dish not found" });
    res.json(dish);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getDishByName = async (req, res) => {
  try {
    const dish = await Dish.findOne({ where: { name: req.params.name } });
    if (!dish) return res.status(404).json({ error: "Dish not found" });
    res.json(dish);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateDish = async (req, res) => {
  try {
    const [updated] = await Dish.update(req.body, {
      where: { id: req.params.id },
    });
    if (!updated) return res.status(404).json({ error: "Dish not found" });
    const updatedDish = await Dish.findByPk(req.params.id);
    res.json(updatedDish);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteDish = async (req, res) => {
  try {
    const deleted = await Dish.destroy({
      where: { id: req.params.id },
    });
    if (!deleted) return res.status(404).json({ error: "Dish not found" });
    res.status(204).send(); 
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.filterDishesByCategory = async (req, res) => {
  try {
    const dishes = await Dish.findAll({
      where: { category: req.params.category },
    });
    res.json(dishes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.filterDishesByPriceRange = async (req, res) => {
  const { minPrice, maxPrice } = req.query;
  try {
    const dishes = await Dish.findAll({
      where: {
        price: {
          [Sequelize.Op.between]: [minPrice, maxPrice],
        },
      },
    });
    res.json(dishes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
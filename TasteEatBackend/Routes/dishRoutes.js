// routes/dishRoutes.js
const express = require("express");
const router = express.Router();
const dishController = require("../Controllers/dishController");

router.get("/", dishController.getAllDishes); 
router.post("/new", dishController.createDish); 
router.get("/id/:id", dishController.getDishById); 
router.get("/name/:name", dishController.getDishByName); 
router.put("/:id", dishController.updateDish); 
router.delete("/:id", dishController.deleteDish); 
router.get("/filter/category/:category", dishController.filterDishesByCategory); 
router.get("/filter/price", dishController.filterDishesByPriceRange); 

module.exports = router;
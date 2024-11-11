const express = require("express");
const router = express.Router();
const reviewController = require("../Controllers/reviewController");

router.get("/resource", reviewController.getAllReviews);
router.post("/new", reviewController.createReview);
router.delete("/:id", reviewController.deleteReview);

module.exports = router;

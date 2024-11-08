const Review = require("../Models/reviews");
const Customer = require("../Models/customers"); 

exports.createReview = async (req, res) => {
  try {
    const { userId, coment } = req.body;

    const user = await Customer.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const review = await Review.create({
      userId,
      coment,
    });

    res.status(201).json(review); 
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.findAll();
    res.status(200).json(reviews); 
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.user; 

    if (role !== 1) {
      return res
        .status(403)
        .json({ error: "You do not have permission to delete this review" });
    }

    const review = await Review.findByPk(id);
    if (!review) {
      return res.status(404).json({ message: "Review not found" }); 
    }
    await review.destroy(); 
    res.status(204).send(); 
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

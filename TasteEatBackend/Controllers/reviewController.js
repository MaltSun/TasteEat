const Review = require("../Models/reviews");
const Customer = require("../Models/customers");

exports.createReview = async (req, res) => {
  try {
    let { userId, coment } = req.body;

    const user = await Customer.findByPk(userId);
    if (!user) {
      userId = null;
    }

    const review = await Review.create({
      userId,
      coment,
    });

    res.status(201).json(review);
  } catch (error) {
    console.error("Ошибка при создании отзыва:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.findAll({
      include: [
        {
          model: Customer,
          attributes: ["username"],
        },
      ],
    });

    // Обработка результатов для замены null на "user"
    const modifiedReviews = reviews.map((review) => {
      const customerInfo = review.Customer
        ? { username: review.Customer.username }
        : { username: "user" };
      return {
        ...review.toJSON(), // Преобразуем объект в JSON
        Customer: customerInfo, // Устанавливаем Customer в объект с username
        //customer: customerInfo.username, // Устанавливаем customer в username
      };
    });

    res.json(modifiedReviews);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ error: "Internal server error" });
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

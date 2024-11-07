const { Model, DataTypes, Sequelize } = require("sequelize");
const { sequelize } = require("./index");

class Review extends Model {}

Review.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Customer",
        key: "id",
      },
    },
    coment: {
      type: DataTypes.TEXT, // Используем TEXT для текстовых комментариев
      allowNull: false,
      validate: {
        len: [0, 240],
        msg: "Комментарий не должен превышать 240 символов.",
      },
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      onUpdate: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: "Review",
  }
);

module.exports = Review;

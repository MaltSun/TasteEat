const { Model, DataTypes, Sequelize } = require("sequelize");
const { sequelize } = require("./index");
const Customer = require("./customers");
class Review extends Model {}

Review.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    coment: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: {
          args: [0, 240],
          msg: "Комментарий не должен превышать 240 символов.",
        },
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
    customerId: {
      type: DataTypes.INTEGER,
      references: {
        model: Customer,
        key: "id",
      },
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Review",
    tableName: "Review",
    timestamps: true,
  }
);
Review.belongsTo(Customer, { foreignKey: "customerId" });
Customer.hasMany(Review, { foreignKey: "customerId" });
module.exports = Review;

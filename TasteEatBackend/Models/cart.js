const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("./index");

class Cart extends Model {}

Cart.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    customerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Customer",
        key: "id",
      },
      index: true, // Индекс для повышения производительности
    },
    dishId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Dish",
        key: "id",
      },
      index: true, // Индекс для повышения производительности
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1, // Значение по умолчанию
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
    modelName: "Cart",
    tableName: "Cart",
    timestamps: true,
  }
);

module.exports = Cart;

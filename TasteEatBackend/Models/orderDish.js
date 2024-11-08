const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("./index");
const Order = require("./orders");
const Dish = require("./dishes");

class OrderDish extends Model {}

OrderDish.init(
  {
    orderId: {
      type: DataTypes.INTEGER,
      references: {
        model: Order,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    dishId: {
      type: DataTypes.INTEGER,
      references: {
        model: Dish,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
  },
  {
    sequelize,
    modelName: "OrderDish",
    tableName: "OrderDish",
    timestamps: true,
  }
);

// Устанавливаем ассоциации
Order.belongsToMany(Dish, { through: OrderDish, foreignKey: "orderId" });
Dish.belongsToMany(Order, { through: OrderDish, foreignKey: "dishId" });

module.exports = OrderDish;

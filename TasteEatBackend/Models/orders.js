const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("./index");

class Order extends Model {}

Order.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    coment: {
      type: DataTypes.TEXT,
      allowNull: true,
      validate: {
        len: [0, 240],
        msg: "Комментарий не должен превышать 240 символов.",
      },
    },
    customerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Customer",
        key: "id",
      },
    },
    status: {
      type: DataTypes.ENUM("pending", "completed", "canceled"),
      allowNull: false,
    },
    deliveryId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "Deliverers",
        key: "id",
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
    modelName: "Order",
  }
);

module.exports = Order;
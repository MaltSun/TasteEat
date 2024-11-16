const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("./index");
const Customer = require("./customers"); 
const Dish = require("./dishes"); 
class Cart extends Model {}

Cart.init(
  {    
    customerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Customer",
        key: "id",
      },
      index: true,
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
Customer.belongsToMany(Dish, { through: Cart, foreignKey: "customerId" });
Dish.belongsToMany(Customer, { through: Cart, foreignKey: "dishId" });

module.exports = Cart;
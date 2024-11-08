const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("./index");

class Dish extends Model {}

Dish.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    weight: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    photo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    calories: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    fat: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    protein: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    carbs: {
      type: DataTypes.DOUBLE,
      allowNull: false,
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
    modelName: "Dish",
    tableName: "Dish",
    timestamps: true,
  }
);

module.exports = Dish;

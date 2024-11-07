"use strict";
const { DataTypes } = require("sequelize");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Order", {
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
        type: DataTypes.ENUM("pending", "completed", "canceled"), // Пример статусов
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
      dishId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Dish",
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
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Order");
  },
};

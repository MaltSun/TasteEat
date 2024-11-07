'use strict';
const { DataTypes } = require("sequelize");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('OrderDish', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      orderId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Order', // Имя таблицы
          key: 'id',
        },
        onDelete: 'CASCADE',
        allowNull: false,
      },
      dishId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Dish', // Имя таблицы
          key: 'id',
        },
        onDelete: 'CASCADE',
        allowNull: false,
      },
      quantity: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    });

    await queryInterface.removeColumn('Order', 'dishId');

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn('Order', 'dishId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Dish',
        key: 'id',
      },
      onDelete: 'CASCADE',
    });

    await queryInterface.dropTable('OrderDish');
  }
};
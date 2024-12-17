'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Dish', 'weight');
    await queryInterface.removeColumn('Dish', 'calories');
    await queryInterface.removeColumn('Dish', 'fat');
    await queryInterface.removeColumn('Dish', 'protein');
    await queryInterface.removeColumn('Dish', 'carbs');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Dish', 'weight', {
      type: Sequelize.DOUBLE,
      allowNull: false,
    });
    await queryInterface.addColumn('Dish', 'calories', {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
    await queryInterface.addColumn('Dish', 'fat', {
      type: Sequelize.DOUBLE,
      allowNull: false,
    });
    await queryInterface.addColumn('Dish', 'protein', {
      type: Sequelize.DOUBLE,
      allowNull: false,
    });
    await queryInterface.addColumn('Dish', 'carbs', {
      type: Sequelize.DOUBLE,
      allowNull: false,
    });
  },
};
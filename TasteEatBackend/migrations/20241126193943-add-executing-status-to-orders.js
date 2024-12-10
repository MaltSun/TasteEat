'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Order', 'status', {
      type: Sequelize.ENUM("pending", "executing", "completed", "canceled"),
      allowNull: false
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Order', 'status', {
      type: Sequelize.ENUM("pending", "completed", "canceled"),
      allowNull: false
    });
  }
};
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Review', 'customerId', {
      type: Sequelize.INTEGER, 
      allowNull: true, 
      references: { 
        model: 'Customer', 
        key: 'id', 
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Review', 'customerId');
  }
};
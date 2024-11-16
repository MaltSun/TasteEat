'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Review', 'customerId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Customer', 
        key: 'id',
      },
      allowNull: true, 
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Review', 'customerId');
  }
};
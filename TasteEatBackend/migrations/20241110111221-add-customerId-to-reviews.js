'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Review', 'customerId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Customer', // Имя таблицы, с которой будет связь
        key: 'id',
      },
      allowNull: true, // Разрешить null для поля customerId
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Review', 'customerId');
  }
};
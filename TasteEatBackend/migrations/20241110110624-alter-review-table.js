"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("Review", "userId", {
      type: Sequelize.INTEGER,
      allowNull: true, // Разрешить null для поля customerId
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("Review", "userId", {
      type: Sequelize.INTEGER,
      allowNull: false, // Вернуть обратно на not null
    });
  },
};

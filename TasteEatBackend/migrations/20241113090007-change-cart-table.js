"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Cart", "id");
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Cart", "id", {});
  },
};

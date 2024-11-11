'use strict';

const { DataTypes } = require("sequelize");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Review', 'coment', {
      type:DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: {
          args: [0, 240],
          msg: "Комментарий не должен превышать 240 символов."
        }
      }
    });
    
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Review', 'customerId');
   
  }
};
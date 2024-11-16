'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    await queryInterface.addConstraint('Cart', {
      fields: ['customerId'],
      type: 'foreign key',
      name: 'fk_cart_customer', 
      references: {
        table: 'Customer', 
        field: 'id', 
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });

    await queryInterface.addConstraint('Cart', {
      fields: ['dishId'],
      type: 'foreign key',
      name: 'fk_cart_dish', 
      references: {
        table: 'Dish', 
        field: 'id', 
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  },

  down: async (queryInterface, Sequelize) => {
    
    await queryInterface.removeConstraint('Cart', 'fk_cart_customer');
    await queryInterface.removeConstraint('Cart', 'fk_cart_dish');
  },
};
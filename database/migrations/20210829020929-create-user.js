'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        type: Sequelize.STRING(50)
      },
      name: {
        type: Sequelize.STRING(25)
      },
      surname: {
        type: Sequelize.STRING(25)
      },
      email: {
        type: Sequelize.STRING(50)
      },
      password: {
        type: Sequelize.STRING(100)
      },
      dni: {
        type: Sequelize.STRING(10)
      },
      province: {
        type: Sequelize.STRING(50)
      },
      location: {
        type: Sequelize.STRING(50)
      },
      address: {
        type: Sequelize.STRING(50)
      },
      number_address: {
        type: Sequelize.STRING(10)
      },
      postal_code: {
        type: Sequelize.STRING(5)
      },
      category: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');
  }
};
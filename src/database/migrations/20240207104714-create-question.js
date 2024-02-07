'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Questions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      question: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      type:{
        type: Sequelize.ENUM('TRUE_OR_FALSE','MULTIPLE_CHOICE'),
        allowNull: false
      },
      options: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: false
      },
      correctOption: {
        type:Sequelize.STRING,
        allowNull: false
      },
      mark: {
        type: Sequelize.INTEGER,
        allowNull: false
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Questions');
  }
};
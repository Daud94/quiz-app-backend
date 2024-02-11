'use strict'
module.exports = {
  up: function (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.changeColumn('Attempts', 'attemptedQuestions', {
        type: Sequelize.ARRAY(Sequelize.STRING),
      }),
    ]);
  },

  down: function (queryInterface, /*Sequelize*/) {
    return Promise.all([
      queryInterface.changeColumn('Attempts', 'attemptedQuestions', {
        type: Sequelize.ARRAY(Sequelize.JSON)
      }),
    ]);
  }
};
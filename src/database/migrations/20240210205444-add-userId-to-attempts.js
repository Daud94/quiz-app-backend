'use strict'
module.exports = {
  up: function (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn('Attempts', 'userId', {
        type: Sequelize.STRING,
      }),
    ]);
  },

  down: function (queryInterface, /*Sequelize*/) {
    return Promise.all([
      queryInterface.removeColumn('Attempts', 'userId',{}),
    ]);
  }
};
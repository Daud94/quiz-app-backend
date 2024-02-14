const { Permission } = require("../../iam/role/permission");
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Permissions", [{
      permissions: JSON.stringify({
        CREATE_QUESTION:"CREATE_QUESTION",
        UPDATE_QUESTION:"UPDATE_QUESTION",
        GET_QUESTIONS:"GET_QUESTIONS",
        DELETE_QUESTION:"DELETE_QUESTION",
        CREATE_USER:"CREATE_USER",
        UPDATE_USER:"UPDATE_USER",
        GET_USERS:"GET_USERS",
        DELETE_USERS:"DELETE_USERS",
        ADD_ADMIN:"ADD_ADMIN",
      }),
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Permissions", null, {});
  }
};
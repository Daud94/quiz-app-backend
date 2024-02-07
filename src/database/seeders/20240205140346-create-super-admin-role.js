const { Permission } = require("../../iam/role/permission");
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Roles", [{
      name: "Super Admin",
      permissions: Object.values(Permission),
      createdBy: 'root',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Users", null, {});
  }
};
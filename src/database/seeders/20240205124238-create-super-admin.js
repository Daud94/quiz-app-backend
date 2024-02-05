const { v4: uuidv4 } = require("uuid");
const { hash } = require("bcrypt");

require("dotenv").config;
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Admins", [{
      firstName: "Super",
      lastName: "Admin",
      adminId: uuidv4(),
      email: process.env['SUPER_ADMIN_EMAIL'],
      role: 'Super Admin',
      password: await hash(process.env["SUPER_ADMIN_PASSWORD"], parseInt(process.env.SALT_OR_ROUNDS)),
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Users", null, {});
  }
};
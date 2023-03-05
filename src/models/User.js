const { sequelize, Sequelize } = require("./db.js");

const User = sequelize.define("user", {
  name: Sequelize.STRING,
  email: Sequelize.STRING,
});

module.exports = User;

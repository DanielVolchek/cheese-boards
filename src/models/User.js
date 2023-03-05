const { sequelize, Sequelize } = require("../db.js");

const User = sequelize.define("user", {
  name: Sequelize.STRING,
  email: Sequelize.STRING,
});

console.log(typeof User);

module.exports = User;

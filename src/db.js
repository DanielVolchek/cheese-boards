// connect to sequelize db
const Sequelize = require("sequelize");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./cheeseboard_db.sqlite",
});

module.exports = {
  sequelize,
  Sequelize,
};

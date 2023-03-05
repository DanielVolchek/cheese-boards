// connect to sequelize db
const Sequelize = require("sequelize");
const User = require("./models/User");
const Board = require("./models/Board");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./cheeseboard_db.sqlite",
});

module.exports = {
  sequelize,
  Sequelize,
  User,
  Board,
};

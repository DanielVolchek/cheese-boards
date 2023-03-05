// connect to sequelize db
const Sequelize = require("sequelize");
const User = require("./models/User");
const Board = require("./models/Board");
const Cheese = require("./models/cheese");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./cheeseboard_db.sqlite",
});

// associations
// user -> board - one to many
Board.belongsTo(User);
User.hasMany(Board);
// cheese -> board - many to many
Board.belongsToMany(Cheese, { through: "cheese_board" });
Cheese.belongsToMany(Board, { through: "cheese_board" });

module.exports = {
  sequelize,
  Sequelize,
  User,
  Board,
  Cheese,
};

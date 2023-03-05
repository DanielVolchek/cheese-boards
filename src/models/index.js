const User = require("./User");
const Board = require("./Board");
const Cheese = require("./cheese");

console.log(Board);

// associations
// user -> board - one to many
Board.belongsTo(User);
User.hasMany(Board);
// cheese -> board - many to many
Board.belongsToMany(Cheese, { through: "cheese_board" });
Cheese.belongsToMany(Board, { through: "cheese_board" });

module.exports = {
  User,
  Board,
  Cheese,
};

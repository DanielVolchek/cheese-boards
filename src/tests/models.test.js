const {
  sequelize,
  Sequelize,
  User,
  Board,
  Cheese,
} = require("../models/db.js");

describe("Database Model Tests", () => {
  beforeEach(async () => {
    // reset db after each test
    sequelize.sync({ force: true });
  });
  it("should be able to create a new user", async () => {
    const user = await User.create({
      name: "Test User",
      email: "user@user.com",
    });

    const foundUser = await User.findByPk(user.id);

    expect(foundUser.name).toBe("Test User");
    expect(foundUser.email).toBe("user@user.com");
  });

  it("should be able to create a new board", async () => {
    const board = await Board.create({
      type: "gouda board",
      description: "its very gouda board",
      rating: 10,
    });

    const foundBoard = await Board.findByPk(board.id);

    expect(foundBoard.type).toBe("gouda board");
    expect(foundBoard.description).toBe("its very gouda board");
    expect(foundBoard.rating).toBe(10);
  });

  it("should be able to create a new cheese", async () => {
    const cheese = await Cheese.create({
      title: "gouda",
      description: "its very gouda",
    });

    const foundCheese = await Cheese.findByPk(cheese.id);

    expect(foundCheese.title).toBe("gouda");
    expect(foundCheese.description).toBe("its very gouda");
  });
});

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

  describe("tests associations", () => {
    it("user should be able to have many boards", async () => {
      const user = await User.create({
        name: "Test User",
        email: "user@user.com",
      });

      const board1 = await Board.create({
        type: "gouda board",
        description: "its very gouda board",
        rating: 10,
      });
      const board2 = await Board.create({
        type: "gouda board 2",
        description: "its very gouda board 2",
        rating: 1,
      });

      user.addBoard(board1);
      user.addBoard(board2);

      const usersBoards = user.getBoards();
      expect(Array.isArray(usersBoards)).toBeTrue();
      expect(usersBoards.length).toBe(2);

      expect(usersBoards[0].id).toBe(board1.id);
      expect(usersBoards[1].id).toBe(board2.id);
    });

    it("boards should be able to have many cheeses", async () => {
      const board = await Board.create({
        type: "gouda board",
        description: "its very gouda board",
        rating: 10,
      });

      const cheese1 = await Cheese.create({
        title: "gouda",
        description: "its very gouda",
      });
      const cheese2 = await Cheese.create({
        title: "gouda",
        description: "its very gouda",
      });
      board.addCheese(cheese1);
      board.addCheese(cheese2);
    });
    it("cheeses should be able to have many boards", async () => {
      const cheese = await Cheese.create({
        title: "gouda",
        description: "its very gouda",
      });
    });
  });
});

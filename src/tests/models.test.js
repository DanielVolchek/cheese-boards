const { sequelize } = require("../db");
const { User, Board, Cheese } = require("../models/index.js");

describe("Database Model Tests", () => {
  beforeEach(async () => {
    // reset db after each test
    await sequelize.sync({ force: true });
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
    console.log("before board");
    console.log("board", Board);

    const board = await Board.create({
      type: "gouda board",
      description: "its very gouda board",
      rating: 10,
    });

    console.log("after board");

    const foundBoard = await Board.findByPk(board.id);

    expect(foundBoard.type).toBe("gouda board");
    expect(foundBoard.description).toBe("its very gouda board");
    expect(foundBoard.rating).toBe(10);
  });
  //
  it("should be able to create a new cheese", async () => {
    const cheese = await Cheese.create({
      title: "gouda",
      description: "its very gouda",
    });

    const foundCheese = await Cheese.findByPk(cheese.id);

    expect(foundCheese.title).toBe("gouda");
    expect(foundCheese.description).toBe("its very gouda");
  });
  //
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

      await user.addBoard(board1);
      await user.addBoard(board2);

      const usersBoards = await user.getBoards();
      expect(Array.isArray(usersBoards)).toBe(true);
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
      await board.addCheese(cheese1);
      await board.addCheese(cheese2);

      const cheeses = await board.getCheeses();
      expect(Array.isArray(cheeses)).toBe(true);
      expect(cheeses.length).toBe(2);
      expect(cheeses[0].id).toBe(cheese1.id);
      expect(cheeses[1].id).toBe(cheese2.id);
    });

    it("cheeses should be able to have many boards", async () => {
      const cheese = await Cheese.create({
        title: "gouda",
        description: "its very gouda",
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

      await cheese.addBoard(board1);
      await cheese.addBoard(board2);

      const boards = await cheese.getBoards();

      expect(Array.isArray(boards)).toBe(true);
      expect(boards.length).toBe(2);
      expect(boards[0].id).toBe(board1.id);
      expect(boards[1].id).toBe(board2.id);
    });
  });

  describe("eager loading tests", () => {
    it("can eager load users with boards", async () => {
      const usersWithBoards = await User.findAll({ include: Board });
      expect(Array.isArray(usersWithBoards)).toBe(true);
    });

    it("can eager load boards with cheeses", async () => {
      const boardsWithCheeses = await Board.findAll({ include: Cheese });
      expect(Array.isArray(boardsWithCheeses)).toBe(true);
    });

    it("can eager load cheeses with boards", async () => {
      const cheesesWithBoards = await Cheese.findAll({ include: Board });
      expect(Array.isArray(cheesesWithBoards)).toBe(true);
    });
  });
});

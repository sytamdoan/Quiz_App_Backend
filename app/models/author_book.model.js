module.exports = (sequelize, Sequelize) => {
  const Author_Book = sequelize.define("author_book", {
    Id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
  });
  return Author_Book;
};

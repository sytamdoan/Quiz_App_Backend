module.exports = (sequelize, Sequelize) => {
  const Genre_Book = sequelize.define("genre_book", {
    Id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
  });
  return Genre_Book;
};

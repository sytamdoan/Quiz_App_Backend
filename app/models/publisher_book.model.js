module.exports = (sequelize, Sequelize) => {
  const Publisher_Book = sequelize.define("publisher_book", {
    Id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
  });
  return Publisher_Book;
};

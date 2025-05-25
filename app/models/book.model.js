module.exports = (sequelize, Sequelize) => {
  const Book = sequelize.define("book", {
    Id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    Title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    NumPages: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    PublicationDate: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    Link: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    IsDeleted: {
      type: Sequelize.INTEGER,
      allowNull: false,
      default: false,
    },
  });
  return Book;
};

module.exports = (sequelize, Sequelize) => {
  const Book = sequelize.define("book", {
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
    }
  });
  return Book;
};

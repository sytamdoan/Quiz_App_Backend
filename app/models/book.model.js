module.exports = (sequelize, Sequelize) => {
  const Book = sequelize.define("book", {
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    numPages: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    publicationDate: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    link: {
      type: Sequelize.STRING,
      allowNull: false,
    }
  });
  return Book;
};

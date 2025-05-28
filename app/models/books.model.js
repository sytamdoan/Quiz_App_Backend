module.exports = (sequelize, Sequelize) => {
  const Books = sequelize.define("books", {
    title: {
      type: Sequelize.STRING(256),
      allowNull: false,
    },
    numPages: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    link: {
      type: Sequelize.STRING(256),
      allowNull: true,
    },
  });
  return Books;
};

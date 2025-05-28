module.exports = (sequelize, Sequelize) => {
  const Author = sequelize.define("author", {
    FirstName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    LastName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    MiddleMan: {
      type: Sequelize.STRING,
      allowNull: true,
    },
  });
  return Author;
};

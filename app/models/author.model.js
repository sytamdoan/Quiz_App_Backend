module.exports = (sequelize, Sequelize) => {
  const Author = sequelize.define("author", {
    firstName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    middleName: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });
  return Author;
};

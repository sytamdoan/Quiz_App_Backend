module.exports = (sequelize, Sequelize) => {
  const Author = sequelize.define("author", {
    Id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
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
    IsDeleted: {
      type: Sequelize.INTEGER,
      allowNull: false,
      default: false,
    },
  });
  return Author;
};

module.exports = (sequelize, Sequelize) => {
  const Publisher = sequelize.define("publisher", {
    Id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    Name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    IsDeleted: {
      type: Sequelize.INTEGER,
      allowNull: false,
      default: false,
    },
  });
  return Publisher;
};

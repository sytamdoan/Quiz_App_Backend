module.exports = (sequelize, Sequelize) => {
  const Publisher = sequelize.define("publisher", {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    }
  });
  return Publisher;
};

module.exports = (sequelize, Sequelize) => {
  const Class = sequelize.define("class", {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    year: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  });

  return Class;
};

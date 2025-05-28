module.exports = (sequelize, Sequelize) => {
  const Genre = sequelize.define("genre", {
    descriptor: {
      type: Sequelize.STRING,
      allowNull: false,
    }
  });
  return Genre;
};

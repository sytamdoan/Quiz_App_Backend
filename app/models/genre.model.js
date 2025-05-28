module.exports = (sequelize, Sequelize) => {
  const Genre = sequelize.define("genre", {
    Descriptor: {
      type: Sequelize.STRING,
      allowNull: false,
    }
  });
  return Genre;
};

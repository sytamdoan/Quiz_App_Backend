module.exports = (sequelize, Sequelize) => {
  const Genre = sequelize.define("genre", {
    Id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    Descriptor: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    IsDeleted: {
      type: Sequelize.INTEGER,
      allowNull: false,
      default: false,
    },
  });
  return Genre;
};

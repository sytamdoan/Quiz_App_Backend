module.exports = (sequelize, Sequelize) => {
  const BookRating = sequelize.define(
    'BookRating', {
      id: {
        type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
      },
      userId: {
        type: Sequelize.INTEGER,
        //allowNull: true,
      },
      ownedBookId: {
        type: Sequelize.INTEGER,
      },
      score: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: true,
          },
      dateAdded: {
        type: Sequelize.DATEONLY,
        allowNull: true
      }
    },
    {
      tableName: 'BookRating',
      timestamps: false
    });

  BookRating.associate = models => {
    BookRating.belongsTo(models.user, {foreignKey: 'userId'});
    BookRating.belongsTo(models.OwnedBook, {foreignKey: 'ownedBookId'});
  };

  return BookRating;
};

module.exports = (sequelize, Sequelize) => {
  const OwnedBook = sequelize.define(
    'OwnedBook', {
      id: {
        type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      bookId: {
        type: Sequelize.INTEGER,
      },
      paidAmount: {
        type: Sequelize.DOUBLE,
        allowNull: true,
      },
      dateBought: {
        type: Sequelize.DATEONLY,
        allowNull: true,
      },
      readingStatusTypesId: {
        type: Sequelize.INTEGER,
      },
      userNotes: {
        type: Sequelize.STRING,
        allowNull: true
      }
    },
    {
      tableName: 'OwnedBook',
      timestamps: false
    });

  OwnedBook.associate = models => {
    OwnedBook.belongsTo(models.user, {foreignKey: 'userId'});
    OwnedBook.belongsTo(models.Book, {foreignKey: 'bookId'});
    OwnedBook.belongsTo(models.ReadingStatusTypes, { foreignKey: 'readingStatusTypesId' });
    OwnedBook.hasOne(models.BookRating, { foreignKey: 'ownedBookId'})
  };

  return OwnedBook;
};

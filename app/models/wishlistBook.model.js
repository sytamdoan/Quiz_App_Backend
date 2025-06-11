module.exports = (sequelize, Sequelize) => {
  const WishlistBook = sequelize.define(
    'WishlistBook', {
      userId: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      bookId: {
        type: Sequelize.INTEGER,
      },
      dateAdded: {
        type: Sequelize.DATEONLY,
        allowNull: true,
      }
    },
    {
      tableName: 'WishlistBook',
      timestamps: false
    });
  WishlistBook.associate = models => {
    WishlistBook.belongsTo(models.user, {foreignKey: 'userId'});
    WishlistBook.belongsTo(models.Book, {foreignKey: 'bookId'});
  };
  return WishlistBook;
};

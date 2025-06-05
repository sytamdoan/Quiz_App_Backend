module.exports = (sequelize, Sequelize) => {
  const OwnedBook = sequelize.define(
    'OwnedBook', {
      id: {
        type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
      },
      Userid: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      Bookid: {
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
      ReadingStatusTypesid: {
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
    OwnedBook.belongsTo(models.Book, {foreignKey: 'Bookid'});
    OwnedBook.belongsTo(
        models.ReadingStatusTypes, {foreignKey: 'ReadingStatusTypesid'});
  };

  return OwnedBook;
};

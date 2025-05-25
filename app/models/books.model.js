module.exports = (sequelize, Sequelize) => {
  const Book = sequelize.define(
      'Book', {
      id: {
        type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
      },
      title: {
        type: Sequelize.STRING,
      },
      numPages: {
        type: Sequelize.INTEGER,
      },
      link: {
        type: Sequelize.STRING(512)
      }
    },
    {
      tableName: 'Book',
      timestamps: false
    });

  Book.associate = models => {
    Book.hasMany(models.OwnedBook, {foreignKey: 'Bookid'});
  };

  return Book;
};

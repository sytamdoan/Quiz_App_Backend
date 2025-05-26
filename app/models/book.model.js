module.exports = (sequelize, Sequelize) => {
  const Book = sequelize.define(
    'Book', {
      id: {
        type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
      },
      title: {
        type: Sequelize.STRING,
        //allowNull: false,
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

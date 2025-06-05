module.exports = (sequelize, Sequelize) => {
  const Book = sequelize.define("book", {
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    numPages: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    publicationDate: {
      type: Sequelize.DATEONLY,
      allowNull: true,
    },
    link: {
      type: Sequelize.STRING,
      allowNull: false,
    }
  });

  Book.associate = models => {
    Book.hasMany(models.OwnedBook, {foreignKey: 'Bookid'});
  };
  
  return Book;
};

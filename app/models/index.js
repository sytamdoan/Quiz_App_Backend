const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// db.ingredient = require("./ingredient.model.js")(sequelize, Sequelize);
// db.recipe = require("./recipe.model.js")(sequelize, Sequelize);
// db.recipeStep = require("./recipeStep.model.js")(sequelize, Sequelize);
// db.recipeIngredient = require("./recipeIngredient.model.js")(
//   sequelize,
//   Sequelize
// );
db.book = require("./book.model.js")(sequelize, Sequelize);
db.author_book = require("./author_book.model.js")(sequelize, Sequelize);
db.author = require("./author.model.js")(sequelize, Sequelize);
db.genre_book = require("./genre_book.model.js")(sequelize, Sequelize);
db.genre = require("./genre.model.js")(sequelize, Sequelize);
db.publisher_book = require("./publisher_book.model.js")(sequelize, Sequelize);
db.publisher = require("./publisher.model.js")(sequelize, Sequelize);
db.session = require("./session.model.js")(sequelize, Sequelize);
db.user = require("./user.model.js")(sequelize, Sequelize);

db.WishlistBook = require('./wishlistBook.model.js')(sequelize, Sequelize);
db.OwnedBook = require('./ownedBook.model.js')(sequelize, Sequelize);
db.ReadingStatusTypes = require('./readingStatusTypes.model.js')(sequelize, Sequelize);
db.BookRating = require("./bookRating.model.js")(sequelize, Sequelize);

db.WishlistBook.associate(db);
db.ReadingStatusTypes.associate(db);
db.OwnedBook.associate(db);
db.BookRating.associate(db);

// foreign key for session
db.user.hasMany(
  db.session,
  { as: "session" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.session.belongsTo(
  db.user,
  { as: "user" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

//Foreign Key for Author_Books
db.author.belongsToMany(db.book, { as: 'books', through: 'author_book' });
db.book.belongsToMany(db.author, { as: 'authors', through: 'author_book' });
//Foreign Key for Genre_Books
db.genre.belongsToMany(db.book, { as: 'books', through: 'genre_book' });
db.book.belongsToMany(db.genre, { as: 'genres', through: 'genre_book' });
//Foreign Key for Publisher_Books
db.publisher.belongsToMany(db.book, { as: 'books', through: 'publisher_book' });
db.book.belongsToMany(db.publisher, { as: 'publishers', through: 'publisher_book' });

// foreign key for recipe
// db.user.hasMany(
//   db.recipe,
//   { as: "recipe" },
//   { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
// );
// db.recipe.belongsTo(
//   db.user,
//   { as: "user" },
//   { foreignKey: { allowNull: true }, onDelete: "CASCADE" }
// );

// foreign key for recipeStep
// db.recipe.hasMany(
//   db.recipeStep,
//   { as: "recipeStep" },
//   { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
// );
// db.recipeStep.belongsTo(
//   db.recipe,
//   { as: "recipe" },
//   { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
// );

// foreign keys for recipeIngredient
// db.recipeStep.hasMany(
//   db.recipeIngredient,
//   { as: "recipeIngredient" },
//   { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
// );
// db.recipe.hasMany(
//   db.recipeIngredient,
//   { as: "recipeIngredient" },
//   { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
// );
// db.ingredient.hasMany(
//   db.recipeIngredient,
//   { as: "recipeIngredient" },
//   { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
// );
// db.recipeIngredient.belongsTo(
//   db.recipeStep,
//   { as: "recipeStep" },
//   { foreignKey: { allowNull: true }, onDelete: "CASCADE" }
// );
// db.recipeIngredient.belongsTo(
//   db.recipe,
//   { as: "recipe" },
//   { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
// );
// db.recipeIngredient.belongsTo(
//   db.ingredient,
//   { as: "ingredient" },
//   { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
// );

module.exports = db;

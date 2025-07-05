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

db.author = require("./author.model.js")(sequelize, Sequelize);
db.session = require("./session.model.js")(sequelize, Sequelize);
db.user = require("./user.model.js")(sequelize, Sequelize);
db.class = require("./class.model.js")(sequelize, Sequelize);
db.quiz = require("./quiz.model.js")(sequelize, Sequelize);
db.quizSession = require("./quizSession.model.js")(sequelize, Sequelize);

// foreign key for session
db.user.hasMany(
  db.session,
  { as: "session" ,
    foreignKey: { allowNull: false }, onDelete: "CASCADE"
  }
);
db.session.belongsTo(
  db.user,
  { as: "user" ,
    foreignKey: { allowNull: false }, onDelete: "CASCADE"
  }
);

//foreign key for class
db.user.hasMany(
  db.class,
  { as: "class" ,
    foreignKey: { allowNull: false }
  }
);
db.class.belongsTo(
  db.user,
  { as: "user" ,
    foreignKey: { allowNull: false }, onDelete: "CASCADE"
  }
);

//foreign key for quiz
db.class.hasMany(
  db.quiz,
  { as: "quiz" ,
    foreignKey: { allowNull: false }
  }
);
db.quiz.belongsTo(
  db.class,
  { as: "class" ,
    foreignKey: { allowNull: false }, onDelete: "CASCADE"
  }
);

//foreign keys for quizSession
db.quiz.hasMany(
  db.quizSession,
  {
    as: "quizSession",
    foreignKey: { allowNull: false }
  }
);
db.quizSession.belongsTo(
  db.quiz,
  {
    as: "quiz",
    foreignKey: { allowNull: false }, onDelete: "CASCADE"
  }
);

db.user.hasMany(
  db.quizSession,
  { as: "quizSession" ,
    foreignKey: { allowNull: false }
  }
);
db.quizSession.belongsTo(
  db.user,
  { as: "user" ,
    foreignKey: { allowNull: false }, onDelete: "CASCADE"
  }
);

module.exports = db;

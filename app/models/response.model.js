const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
  const Quiz = sequelize.define("response", {
    quizSessionId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    questionId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    answerId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
  }, {
    indexes: [
      {
        unique: true,
        fields: ['quizSessionId', 'questionId', 'userId']
      }
    ]
  });

  return Quiz;
};
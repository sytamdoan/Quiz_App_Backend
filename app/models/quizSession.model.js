module.exports = (sequelize, Sequelize) => {
  const QuizSession = sequelize.define("quizSession", {
    isActive: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
    entryCode: {
      type: Sequelize.STRING,
      allowNull: false,
      },
    expirationDate: {
      type: Sequelize.DATE,
      allowNull: false,
      },
  });

  return QuizSession;
};
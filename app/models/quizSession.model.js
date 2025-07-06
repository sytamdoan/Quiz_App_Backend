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
    isResultsVisible: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      },
    avgGrade: {
      type: Sequelize.DOUBLE,
      allowNull: true,
      },
    questionData: {
      type: Sequelize.JSON,
      allowNull: true,
      },
    studentData: {
      type: Sequelize.JSON,
      allowNull: true,
      },
  });

  return QuizSession;
};
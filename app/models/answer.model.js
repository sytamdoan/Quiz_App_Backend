module.exports = (sequelize, Sequelize) => {
  const Answer = sequelize.define("answer", {
    answerText: {
      type: Sequelize.STRING,
      allowNull: false,
      },
    isCorrect: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      },
  });

  return Answer;
};
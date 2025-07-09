module.exports = (sequelize, Sequelize) => {
  const Question = sequelize.define("question", {
    questionText: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });

  return Question;
};

module.exports = (sequelize, Sequelize) => {
  const Quiz = sequelize.define("quiz", {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    type: {
      type: Sequelize.ENUM,
      allowNull: false,
      values: ['poll', 'quiz']
      },
    timeLimit: {
      type: Sequelize.INTEGER,
      allowNull: false,
      },
    isResultsVisible: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      },
    questions: {
      type: Sequelize.JSON,
      allowNull: false,
      },
  });

  return Quiz;
};
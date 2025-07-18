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
    subject: {
      type: Sequelize.STRING,
      allowNull: false,
      },
    timeLimit: {
      type: Sequelize.INTEGER,
      allowNull: false,
      },
    isResultsVisible: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      },
    isAnonymous: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      },
    isEditable: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      },
    
  });

  return Quiz;
};
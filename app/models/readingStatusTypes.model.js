module.exports = (sequelize, Sequelize) => {
  const ReadingStatusTypes = sequelize.define(
    'ReadingStatusTypes', {
      id: {
        type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
      },
      statusName: {
        type: Sequelize.STRING
      }
    },
    {
      tableName: 'ReadingStatusTypes',
      timestamps: false
    });

  ReadingStatusTypes.associate = models => {
    ReadingStatusTypes.hasMany(
        models.OwnedBook, {foreignKey: 'readingStatusTypesId'});
  };

  return ReadingStatusTypes;
};

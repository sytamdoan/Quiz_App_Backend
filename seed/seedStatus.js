module.exports = async (db) => {
  const ReadingStatusTypes = db.ReadingStatusTypes;

  const count = await ReadingStatusTypes.count();
  if (count > 0) {
    console.log("ReadingStatusTypes already seeded.");
    return;
  }

  const statuses = [
    { statusName: 'To Read' },
    { statusName: 'Reading' },
    { statusName: 'Finished' },
    { statusName: 'DNF' },
  ];

  await ReadingStatusTypes.bulkCreate(statuses);
  console.log("ReadingStatusTypes seeded.");
};

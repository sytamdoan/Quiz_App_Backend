const db = require("../models");
const publisher = db.publisher;

const Op = db.Sequelize.Op;

// Find all Created Publishers
exports.findAll = (req, res) => {
  publisher.findAll({
    where:null,
  })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Created Publishers.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error retrieving Created Publishers.",
      });
    });
};

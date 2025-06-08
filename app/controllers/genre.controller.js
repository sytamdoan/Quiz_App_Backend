const db = require("../models");
const genre = db.genre;

const Op = db.Sequelize.Op;

// Find all Created Genres
exports.findAll = (req, res) => {
  genre.findAll({
    where:null,
  })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Created Genres.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error retrieving Created Genres.",
      });
    });
};

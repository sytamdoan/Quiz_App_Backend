const db = require("../models");
const Genre = db.genre;
const Op = db.Sequelize.Op;

// Find all Created Genres
exports.findAll = (req, res) => {
  Genre.findAll({
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

// Find one Genre
exports.findOne = (req, res) => {
  const id = req.params.id;

  Genre.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Genre.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error retrieving Genre.",
      });
    });
};

// Create a Genre
exports.create = (req, res) => {

};

// Update a Genre
exports.update = (req, res) => {

};

// Delete a Genre
exports.delete = (req, res) => {

};
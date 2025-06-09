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
  // Validate request
  if (req.body.descriptor === undefined || req.body.descriptor === "" || req.body.descriptor === null) {
    const error = new Error("Name can't be empty!");
    error.statusCode = 400;
    throw error;
  }

  // Create a Genre
  const genre = {
    descriptor: req.body.descriptor,
  };

  // Save Genre in the database
  Genre.create(genre)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the genre.",
      });
    });
};

// Update a Genre
exports.update = (req, res) => {
  // Validate request
  if (req.body.descriptor === undefined || req.body.descriptor === "" || req.body.descriptor === null) {
    const error = new Error("Name can't be empty!");
    error.statusCode = 400;
    throw error;
  }

  const id = req.params.id;
  const genre = {
    descriptor: req.body.descriptor,
  }
  Genre.update(genre, {where: id})
    .then((num) => {
      if (num == 1) {
        res.send("Genre was successfully updated.")
      } else if (num <= 0) {
        res.send({
          message: `Cannot update Genre with id=${id}. Maybe Genre was not found or req.body is empty!`
        })
      } else {
        console.log(`In Genre table, too many rows with id=${id} were updated.`)
        res.send({
          message: `Too many rows with id=${id} were updated.`
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Error updating Genre with id=${id}.`
      })
    })
};

// Delete a Genre
exports.delete = (req, res) => {
  const id = req.params.id;

  Genre.destroy({
    where: {id: id},
  })
    .then((num) => {
      if (num == 1) {
        res.send("Genre was successfully deleted.")
      } else if (num <= 0) {
        res.send({
          message: `Cannot delete Genre with id=${id}. Maybe Genre was not found or req.body is empty!`
        })
      } else {
        console.log(`In Genre table, too many rows with id=${id} were deleted.`)
        res.send({
          message: `Too many rows with id=${id} were deleted.`
        })
      }
    })
};
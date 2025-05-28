const db = require("../models");
const Author = db.author;
const Op = db.Sequelize.Op;

// Create and Save a new Author
exports.create = (req, res) => {
  // Validate request
  if (req.body.firstName === undefined || req.body.firstName === "") {
    const error = new Error("First name cant be empty!");
    error.statusCode = 400;
    throw error;
  } else if (req.body.lastName === undefined || req.body.lastName === "") {
    const error = new Error("Last name cant be empty!");
    error.statusCode = 400;
    throw error;
  }

  // Create an author
  const author = {
    firstName: req.body.firstName,
    middleName: req.body.middleName,
    lastName: req.body.lastName,
  };
  // Save Author in the database
  Author.create(author)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the author.",
      });
    });
};

// Retrieve all authors from the database.
exports.findAll = (req, res) => {
  const authorId = req.query.authorId;
  var condition = authorId ? { id: { [Op.like]: `%${authorId}%` } } : null;

  Author.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Authors.",
      });
    });
};

// Find a single Author with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Author.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error retrieving Author with id=" + id,
      });
    });
};

// Update a Author by the id in the request
exports.update = (req, res) => {

  if (req.body.firstName === undefined || req.body.firstName === "") {
    const error = new Error("First name cant be empty!");
    error.statusCode = 400;
    throw error;
  } else if (req.body.lastName === undefined || req.body.lastName === "") {
    const error = new Error("Last name cant be empty!");
    error.statusCode = 400;
    throw error;
  }

  const id = req.params.id;
  
  Author.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Author was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Author with id=${id}. Maybe Author was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating Author with id=" + id,
      });
    });
};

// Delete a Author with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Author.destroy({
    where: { id: id },
  })
    .then((number) => {
      if (number == 1) {
        res.send({
          message: "Author was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Author with id=${id}. Maybe Author was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Could not delete Author with id=" + id,
      });
    });
};

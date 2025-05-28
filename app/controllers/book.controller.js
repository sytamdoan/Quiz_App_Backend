const db = require("../models");
const book = db.book;
const Op = db.Sequelize.Op;
// Create and Save a new Recipe
exports.create = (req, res) => {
  // Validate request
  if (req.body.title === undefined) {
    const error = new Error("Title cannot be empty for Book!");
    error.statusCode = 400;
    throw error;
  } else if (req.body.numPages === undefined) {
    const error = new Error("Number of Pages cannot be empty for Book!");
    error.statusCode = 400;
    throw error;
  }

  // Create a Book
  const book = {
    title: req.body.title,
    numPages: req.body.numPages,
    publicationDate: req.body.publicationDate,
    link: req.body.link,
  };
  // Save Book in the database
  book.create(book)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Book.",
      });
    });
};

// Find all Created Books
exports.findAllPublished = (req, res) => {
  book.findAll({
    where:null,
    include: ['authors','genres','publishers'],
  })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Created Books.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error retrieving Created Books.",
      });
    });
};

// Find a single Book with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  book.findAll({
    where: { id: id },
    include: ['authors','genres','publishers'],
  })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Book with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error retrieving Book with id=" + id,
      });
    });
};
// Update a Book by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  book.update(req.body, {
    where: { id: id },
  })
    .then((number) => {
      if (number == 1) {
        res.send({
          message: "Book was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Book with id=${id}. Maybe Book was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating Book with id=" + id,
      });
    });
};
// Delete a Book with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  book.destroy({
    where: { id: id },
  })
    .then((number) => {
      if (number == 1) {
        res.send({
          message: "Book was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Book with id=${id}. Maybe Book was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Could not delete Book with id=" + id,
      });
    });
};

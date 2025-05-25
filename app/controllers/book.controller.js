const db = require("../models");
const book = db.book;
const Op = db.Sequelize.Op;
// Create and Save a new Recipe
exports.create = (req, res) => {
  // Validate request
  if (req.body.Title === undefined) {
    const error = new Error("Name cannot be empty for recipe!");
    error.statusCode = 400;
    throw error;
  } else if (req.body.NumPages === undefined) {
    const error = new Error("Description cannot be empty for recipe!");
    error.statusCode = 400;
    throw error;
  } else if (req.body.PublicationDate === undefined) {
    const error = new Error("Servings cannot be empty for recipe!");
    error.statusCode = 400;
    throw error;
  } else if (req.body.Link === undefined) {
    const error = new Error("Time cannot be empty for recipe!");
    error.statusCode = 400;
    throw error;
  }

  // Create a Book
  const book = {
    Id: 0,
    Title: req.body.Title,
    NumPages: req.body.NumPages,
    Link: req.body.Link,
    IsDeleted: false,
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
  book.findAll({where:null})
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
    where: { Id: id },
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
    where: { Id: id },
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
  req.body.IsDeleted = true;
  book.update(req.body,{
    where: { Id: id },
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

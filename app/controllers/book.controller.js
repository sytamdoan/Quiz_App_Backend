const db = require("../models");
const Book = db.book;
const Op = db.Sequelize.Op;

// Used to Create a Book
exports.create = (req, res) => {
  // Validate request
  if (req.body.title === undefined) {
    const error = new Error("Title cannot be empty for book!")
    error.statusCode = 400;
    throw error;
  } else if (req.body.numPages === undefined) {
    const error = new Error("Number of pages cannot be empty")
    error.statusCode = 400;
    throw error;
  } else if (req.body.numPages < 0) {
    const error = new Error("Number of pages cannot be negative")
    error.statusCode = 400;
    throw error;
  }

  // Create a book
  const book = {
    title: req.body.title,
    numPages: req.body.numPages,
    link: req.body.link,
  };
  
  // Save book in the database
  Book.create(book)
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error ocurred while creating the Book.",
        });
    });
};

// Used to Fetch All Books of the system
exports.findAll = (req, res) => {
  const bookId = req.query.bookId;
  var condition = bookId // if a bookId is given, filter for it
    ? {
        id: {
          [Op.like]: `%${bookId}%`, // TODO: if we want an exact match, do "id: bookId" instead
        },
      }
    : null;

  // Find and return the desired data
  // TODO: update to also return genre and authors
  Book.findAll({ where: condition, order: [["title", "ASC"]] })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving books.",
      });
    });
};

// Used to Fetch All Books of the system by author
exports.findAllByAuthor = (req, res) => {
  // TODO
};

// Used to Fetch All Books of the system by genre
exports.findAllByGenre = (req, res) => {
  // TODO
};

// Used to Fetch Book Suggestions of the system for the specific user
exports.findAllByGenre = (req, res) => {
  // TODO
};

// Used to Fetch a Book by its id
exports.findOne = (req, res) => {
  // TODO
};

// Used to Modify an Existing Book
exports.update = (req, res) => {
  // TODO
}

// Used to Delete an Existing Book
exports.delete = (req, res) => {
  // TODO
}
const db = require("../models");
const Book = db.book;
const Op = db.Sequelize.Op;

// Used to Create a Book
exports.create = (req, res) => {
  // Validate request
  if (req.body.Title === undefined) {
    const error = new Error("Title cannot be empty for book!")
    error.statusCode = 400;
    throw error;
  } else if (req.body.NumPages === undefined) {
    const error = new Error("Number of pages cannot be empty")
    error.statusCode = 400;
    throw error;
  } else if (req.body.NumPages < 0) {
    const error = new Error("Number of pages cannot be negative")
    error.statusCode = 400;
    throw error;
  }
  // TODO: require Authorid, AuthorFullName, and Genre

  // Create a book
  const book = {
    title: req.body.Title,
    numPages: req.body.NumPages,
    link: req.body.Link,
  };
  // TODO: Create BookAuthor and BookGenre entries
  
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
    // TODO: Save bookAuthor and bookGenre in the database
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
  // TODO: Requires BookAuthor (and consequently, Author) table
};

// Used to Fetch All Books of the system by genre
exports.findAllByGenre = (req, res) => {
  // TODO: Requires BookGenre (and consequently, Genre) table
};

// Used to Fetch Book Suggestions of the system for the specific user
exports.findAllSuggestionsByUser = (req, res) => {
  // TODO: Requires knowledge of LLM
};

// Used to Fetch a Book by its id
exports.findOne = (req, res) => {
  const id = req.params.Id;
  Book.findOne({
    where: {id: id}
  })
    .then((data) => {
      if (data) {
        res.send(data)
      } else {
        res.status(404).send({
          message: `not find Book with id=${id}.`
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error retrieving Book with id=" + id,
      })
    });
};

// Used to Modify an Existing Book
exports.update = (req, res) => {
  const id = req.params.bookId;

  const book = {
    title: req.body.Title,
    numPages: req.body.NumPages,
    link: req.body.Link,
  };
  
  Book.update(book, {
    where: {id: id}
  })
    .then((number) =>{
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

}

// Used to Delete an Existing Book
exports.delete = (req, res) => {
  // TODO
}
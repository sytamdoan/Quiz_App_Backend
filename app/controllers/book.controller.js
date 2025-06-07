const db = require("../models");
const book = db.book;
const genre_book = db.genre_book;
const author_book = db.author_book;
const publisher_book = db.publisher_book;
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
  let genres = req.body.genres;

  // Save Book in the database
  book.create(
    {
      title: req.body.title,
      numPages: req.body.numPages,
      publicationDate: req.body.publicationDate,
      link: req.body.link,
    }
  )
    .then((data) => {
      res.send(data);
      genres.array.forEach(element => {
        genre_book.create({
          bookId:data.body.id,
          genreId:element.id
        })
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Book.",
      });
    })
    .spread();
};
// Find all Created Books
exports.findAll = (req, res) => {
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
  book.findOne({
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
  let genres = req.body.genres;
  let authors = req.body.authors;
  let publishers = req.body.publishers;
  let previousGenres = [];
  let previousAuthors = [];
  let previousPublishers = [];
  book.findOne({
    where: { id: id },
    include: ['authors','genres','publishers'],
  })
  .then((data) => {
    if (data) {
      previousGenres = data.genres;
      previousAuthors = data.authors;
      previousPublishers = data.publishers;
    }
    book.update(
      {
        title: req.body.title,
        numPages: req.body.numPages,
        publicationDate : req.body.publicationDate,
        link: req.body.link,
      },
      {
        where: { id: id }
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
      try{
        if(genres){
          const removeDifference = previousGenres.filter(x => !genres.includes(x));
          const addDifference = genres.filter(x => !previousGenres.includes(x));
          addDifference.forEach(element => {
            genre_book.create({
              bookId:id,
              genreId:element.id
            })
          });
          removeDifference.forEach(element => {
            genre_book.destroy({
              where:{
                bookId:id,
                genreId:element.id
              }
            })
          });
        }
      }
      catch(ex){
        res.status(500).send({
          message: ex.message || "Error updating Book Genres with id=" + id,
        });
      }
      try{
        if(authors){
          const removeDifference = previousAuthors.filter(x => !authors.includes(x));
          const addDifference = authors.filter(x => !previousAuthors.includes(x));
          addDifference.forEach(element => {
            author_book.create({
              bookId:id,
              authorId:element.id
            })
          });
          removeDifference.forEach(element => {
            author_book.destroy({
              where:{
                bookId:id,
                authorId:element.id
              }
            })
          });
        }
      }
      catch(ex){
        res.status(500).send({
          message: ex.message || "Error updating Book Authors with id=" + id,
        });
      }
      try{
        if(genres){
          const removeDifference = previousPublishers.filter(x => !publishers.includes(x));
          const addDifference = publishers.filter(x => !previousPublishers.includes(x));
          addDifference.forEach(element => {
            publisher_book.create({
              bookId:id,
              publisherId:element.id
            })
          });
          removeDifference.forEach(element => {
            publisher_book.destroy({
              where:{
                bookId:id,
                publisherId:element.id
              }
            })
          });
        }
      }
      catch(ex){
        res.status(500).send({
          message: ex.message || "Error updating Book Publishers with id=" + id,
        });
      }
  })
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

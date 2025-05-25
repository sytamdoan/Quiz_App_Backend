module.exports = (app) => {
  const Book = require("../controllers/book.controller.js");
  const { authenticateRoute } = require("../authentication/authentication.js");
  var router = require("express").Router();

  // Create a new Book
  router.post("/books/", [authenticateRoute], Book.create);

  // Retrieve all published Books
  router.get("/books", Book.findAllPublished);

  // Retrieve a single Book with id
  router.get("/books:id", Book.findOne);

  // Update a Book with id
  router.put("/books:id", [authenticateRoute], Book.update);

  // Delete a Book with id
  router.delete("/books:id", [authenticateRoute], Book.delete);

  app.use("/bookshelfapi", router);
};

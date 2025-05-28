module.exports = (app) => {
  const Book = require("../controllers/book.controller.js");
  const { authenticateRoute } = require("../authentication/authentication.js");
  var router = require("express").Router();

  // Create a new Book
  router.post("/Books/", [authenticateRoute], Book.create);

  // Retrieve all published Books
  router.get("/Books", Book.findAllPublished);

  // Retrieve a single Book with id
  router.get("/Books/:id", Book.findOne);

  // Update a Book with id
  router.put("/Books/:id", [authenticateRoute], Book.update);

  // Delete a Book with id
  router.delete("/Books/:id", [authenticateRoute], Book.delete);

  app.use("/bookshelfapi", router);
};

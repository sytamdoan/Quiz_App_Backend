module.exports = (app) => {
  const Book = require("../controllers/book.controller.js");
  const { authenticateRoute } = require("../authentication/authentication.js");
  var router = require("express").Router();

  // Used to Fetch All Books of the system
  router.get("/Books/", Book.findAll);

  // Used to Fetch All Books of the system by author
  router.get("/Books/:Authorid", Book.findAllByAuthor);
  
  // Used to Fetch All Books of the system by genre
  router.get("/Books/:Genreid", Book.findAllByGenre);
  
  // Used to Fetch Book Suggestions of the system for the specific user
  router.get("/Books/Suggestion/", [authenticateRoute], Book.findAllSuggestionsByUser);

  // Used to Fetch a Book by its id
  router.get("/Books/:id", Book.findOne);

  // Used to Create a Book
  router.post("/Books/", [authenticateRoute], Book.create);

  // Used to Modify an Existing Book
  router.put("/Books/:id", [authenticateRoute], Book.update);
  
  // Used to Delete an Existing Book
  router.delete("/Books/:id", [authenticateRoute], Book.delete);


  app.use("/bookshelfapi", router);
};

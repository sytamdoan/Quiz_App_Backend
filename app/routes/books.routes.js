module.exports = (app) => {
  const Books = require("../controllers/books.controller.js");
  const { authenticateRoute } = require("../authentication/authentication.js");
  var router = require("express").Router();

  // Used to Fetch All Books of the system
  router.get("/Books/", Books.findAll);

  // Used to Fetch All Books of the system by author
  router.get("/Books/:Authorid", Books.findAllByAuthor);
  
  // Used to Fetch All Books of the system by genre
  router.get("/Books/:Genreid", Books.findAllByGenre);
  
  // Used to Fetch Book Suggestions of the system for the specific user
  router.get("/Books/Suggestion/", [authenticateRoute], Books.findAllSuggestionsByUser);

  // Used to Fetch a Book by its id
  router.get("/Books/:id", Books.findOne);

  // Used to Create a Book
  router.post("/Books/", /*[authenticateRoute],*/ Books.create);

  // Used to Modify an Existing Book
  router.put("/Books/:bookId", /*[authenticateRoute],*/ Books.update);
  
  // Used to Delete an Existing Book
  router.delete("/Books/:id", /*[authenticateRoute],*/ Books.delete);


  app.use("/bookshelfapi", router);
};

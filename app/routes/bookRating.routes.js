module.exports = (app) => {
  const BookRating = require("../controllers/bookRating.controller.js");
  const { authenticateRoute } = require("../authentication/authentication.js");
  var router = require("express").Router();

  // Create a new Book rating that is linked to the owned book
  router.post("/BookRating/", [authenticateRoute], BookRating.create);

  // Update a Book rating with id
  router.put("/BookRating/:id", [authenticateRoute], BookRating.update);

  // Delete a Book rating with id
  router.delete("/BookRating/:id", [authenticateRoute], BookRating.delete);

  app.use("/bookshelfapi", router);
};

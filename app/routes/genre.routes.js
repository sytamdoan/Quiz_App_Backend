module.exports = (app) => {
  const Genre = require("../controllers/genre.controller.js");
  const { authenticateRoute } = require("../authentication/authentication.js");
  var router = require("express").Router();

  // Retrieve all published Genres
  router.get("/Genres", Genre.findAll);

  // Retrieve one Genre
  router.get("/Genre/:id", Genre.findOne);

  // Create a Genre
  router.post("/Genre", Genre.create);

  // Update a Genre
  router.put("/Genre/:id", Genre.update);

  // Delete a Genre
  router.delete("/Genre/:id", Genre.delete);

  app.use("/bookshelfapi", router);
};

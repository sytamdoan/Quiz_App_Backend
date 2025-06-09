module.exports = (app) => {
  const Genre = require("../controllers/genre.controller.js");
  const { authenticateRoute } = require("../authentication/authentication.js");
  var router = require("express").Router();
  // Retrieve all published Genres
  router.get("/Genres", Genre.findAll);

  app.use("/bookshelfapi", router);
};

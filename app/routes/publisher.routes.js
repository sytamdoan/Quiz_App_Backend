module.exports = (app) => {
  const Publisher = require("../controllers/publisher.controller.js");
  const { authenticateRoute } = require("../authentication/authentication.js");
  var router = require("express").Router();
  // Retrieve all published Genres
  router.get("/Publishers", Publisher.findAll);

  app.use("/bookshelfapi", router);
};

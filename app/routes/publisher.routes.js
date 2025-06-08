module.exports = (app) => {
  const Publisher = require("../controllers/publisher.controller.js");
  const { authenticateRoute } = require("../authentication/authentication.js");
  var router = require("express").Router();

  // Retrieve all Publishers
  router.get("/Publishers", Publisher.findAll);

  // Retrieve one Publisher
  router.get("/Publisher/:id", Publisher.findOne);

  // Create a Publisher
  router.post("/Publisher", Publisher.create);

  // Update a Publisher
  router.put("/Publisher/:id", Publisher.update);

  // Delete a Publisher
  router.delete("/Publisher/:id", Publisher.delete);
  
  app.use("/bookshelfapi", router);
};

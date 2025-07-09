module.exports = (app) => {
  const Class = require("../controllers/class.controller.js");
  var router = require("express").Router();

  // Create a new Class
  router.post("/Class/", Class.create);

  // Retrieve all Class relating to this user
  router.get("/Class/", Class.findAll);

  // Update a Class with id
  router.put("/Class/:id", Class.update);

  // Delete a Class with id
  router.delete("/Class/:id", Class.delete);

  app.use("/quizappapi", router);
};
module.exports = (app) => {
    const Answer = require("../controllers/answer.controller.js");
  var router = require("express").Router();

  // Create a new Answer
  router.post("/Quiz/:id/Answer/", Answer.create);

  // Retrieve all Answer relating to this Quiz
  router.get("/Quiz/:id/Answer/", Answer.findAll);

  // Update a Answer with id
  router.put("/Answer/:id", Answer.update);

  // Delete a Answer with id
  router.delete("/Answer/:id", Answer.delete);

  app.use("/quizappapi", router);
};
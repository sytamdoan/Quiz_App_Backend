module.exports = (app) => {
  const Answer = require("../controllers/answer.controller.js");
  var router = require("express").Router();

  // Create a new Answer
  router.post("/Question/:questionId/Answer/", Answer.create);

  // Retrieve all Answer relating to this Quiz
  router.get("/Question/:questionId/Answers/", Answer.findAll);

  // Update a Answer with id
  router.put("/Answer/:id", Answer.update);

  // Delete a Answer with id
  router.delete("/Answer/:id", Answer.delete);

  app.use("/quizappapi", router);
};
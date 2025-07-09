module.exports = (app) => {
  const Question = require("../controllers/question.controller.js");
  var router = require("express").Router();

  // Create a new Question
  router.post("/Question/", Question.create);

  // Retrieve all Question relating to quizId
  router.get("/Question/", Question.findAllByQuizId);

  // Update a Question with id
  router.put("/Question/:id", Question.update);

  // Delete a Question with id
  router.delete("/Question/:id", Question.delete);

  app.use("/quizappapi", router);
};
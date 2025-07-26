module.exports = (app) => {
    const Quiz = require("../controllers/quiz.controller.js");
  var router = require("express").Router();

  // Create a new Quiz
  router.post("/Class/:id/Quiz/", Quiz.create);

  // Create a new Quiz as a duplicate of one
  router.post("/Quiz/:id/duplicate", Quiz.duplicateQuiz);

  // Retrieve all Quiz relating to this Class
  router.get("/Class/:id/Quiz/", Quiz.findAll);

  // Update a Quiz with id
  router.put("/Quiz/:id", Quiz.update);

  // Delete a Quiz with id
  router.delete("/Quiz/:id", Quiz.delete);

  app.use("/quizappapi", router);
};
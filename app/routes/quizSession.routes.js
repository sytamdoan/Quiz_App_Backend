module.exports = (app) => {
  const QuizSession = require("../controllers/quizSession.controller.js");
  var router = require("express").Router();

  // Create a new QuizSession
  router.post("/Quiz/:quizId/QuizSession/", QuizSession.createByQuiz);

  // Retrieve all QuizSession relating to this Quiz
  router.get("/Quiz/:quizId/QuizSession/", QuizSession.findAllByQuizId);

  // Retireve one QuizSession by its ID
  router.get("/QuizSession/:id", QuizSession.findOne);

  // Update a QuizSession with id
  router.put("/QuizSession/:id", QuizSession.update);

  // Delete a QuizSession with id
  router.delete("/QuizSession/:id", QuizSession.delete);
  
  // Create a new QuizSession
  router.post("/QuizSession/", QuizSession.create);

  // end QuizSession by sessionId
  router.put("/QuizSession/:sessionId", QuizSession.endSession);

  app.use("/quizappapi", router);
};
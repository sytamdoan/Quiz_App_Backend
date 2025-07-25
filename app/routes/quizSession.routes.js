module.exports = (app) => {
  const QuizSession = require("../controllers/quizSession.controller.js");
  var router = require("express").Router();

// Create a new QuizSession
  router.post("/QuizSession/", QuizSession.create);

  // Retrieve QuizSession by sessionId
  router.get("/QuizSession/:sessionId", QuizSession.findOne);

  app.use("/quizappapi", router);
};
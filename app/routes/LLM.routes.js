module.exports = (app) => {
  const Cohere = require("../controllers/LLM.controller.js");
  var router = require("express").Router();

  // POST request to get recommendations from Cohere
  router.post("/recommend", Cohere.getRecommendations);

    // POST request to Generate Whole Quiz for Class from Cohere
  router.post("/generateQuiz/:id", Cohere.generateQuizForClass);

  app.use("/quizappapi", router);
};
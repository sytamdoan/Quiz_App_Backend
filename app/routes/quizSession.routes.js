module.exports = (app) => {
  const QuizSession = require("../controllers/quizSession.controller.js");
  var router = require("express").Router();



  app.use("/quizappapi", router);
};
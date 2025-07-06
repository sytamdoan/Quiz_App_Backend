module.exports = (app) => {
    const Quiz = require("../controllers/quiz.controller.js");
  var router = require("express").Router();



  app.use("/quizappapi", router);
};
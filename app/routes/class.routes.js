module.exports = (app) => {
  const Class = require("../controllers/class.controller.js");
  var router = require("express").Router();



  app.use("/quizappapi", router);
};
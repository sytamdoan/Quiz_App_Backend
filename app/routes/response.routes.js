module.exports = (app) => {
  const model = require("../controllers/response.controller.js");
  var router = require("express").Router();

  // Create a new Response
  router.post("/Response", model.create);

  // Get all Responses (with filters in request body)
  router.get("/Response", model.findAll)

  // Get one Response
  router.get("/Response/:id", model.findOne)

  // Delete all Responses
  router.delete("/Response/:id", model.delete)


  app.use("/quizappapi", router);
};
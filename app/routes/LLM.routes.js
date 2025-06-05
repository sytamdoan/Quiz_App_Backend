module.exports = (app) => {
  const Cohere = require("../controllers/LLM.controller.js");
  var router = require("express").Router();

  // POST request to get recommendations from Cohere
  router.post("/recommend", Cohere.getRecommendations);

  app.use("/bookshelfapi", router);
};
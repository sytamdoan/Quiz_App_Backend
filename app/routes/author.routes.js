module.exports = (app) => {
  const Author = require("../controllers/author.controller.js");
  var router = require("express").Router();

  // Create a new Author
  router.post("/Author/", Author.create);

  // Retrieve all Author
  router.get("/Authors/", Author.findAll);

  // Retrieve a single User with id
  router.get("/Author/:id", Author.findOne);

  // Update a Author with id
  router.put("/Author/:id", Author.update);

  // Delete a Author with id
  router.delete("/Author/:id", Author.delete);

  app.use("/bookshelfapi", router);
};

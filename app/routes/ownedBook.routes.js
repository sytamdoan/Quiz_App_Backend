module.exports = (app) => {
  const verifyToken = require("../utils/verifyToken.js");
  const OwnedBook = require("../controllers/ownedBook.controller.js");
  var router = require("express").Router();

  // Create a new Book
  router.post("/OwnedBook/", verifyToken, OwnedBook.create);

  // Retrieve all Books
  router.get("/OwnedBook/", OwnedBook.findAll);

  // // Retrieve a single User with id
  // router.get("/OwnedBook/:id", OwnedBook.findOne);

  // Update a Book with id
  router.put("/OwnedBook/:id", OwnedBook.update);

  // Delete a Book with id
  router.delete("/OwnedBook/:id", OwnedBook.delete);

  app.use("/bookshelfapi", router);
};
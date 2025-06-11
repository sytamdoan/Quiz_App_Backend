module.exports = (app) => {

  const verifyToken = require("../utils/verifyToken.js");
  const WishlistBook = require("../controllers/wishlistBook.controller.js");
  var router = require("express").Router();

  // Create a new WishlistBook
  router.post("/WishlistBook/", verifyToken, WishlistBook.create);

  // Retrieve all WishlistBook
  router.get("/WishlistBook/", WishlistBook.findAll);

  // Update a WishlistBook with id
  router.put("/WishlistBook/:id", WishlistBook.update);

  // Delete a WishlistBook with id
  router.delete("/WishlistBook/:id", WishlistBook.delete);

  app.use("/bookshelfapi", router);
};
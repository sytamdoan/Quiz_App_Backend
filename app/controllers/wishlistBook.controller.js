const db = require("../models");
const WishlistBook = db.WishlistBook;
const Book = db.book;
const Op = db.Sequelize.Op;
const { decrypt } = require("../authentication/crypto");
const getUserIdFromToken = require("../utils/getUserIdFromToken");
const Session = db.session;

exports.create = async (req, res) => {
try{ 
    const userId = await getUserIdFromToken(req);
    const bookId = req.body.bookId;        
    const rawDate = req.body.dateAdded;
    if (!rawDate || rawDate === "Invalid date" || isNaN(Date.parse(rawDate))) {
      return res.status(400).json({ message: "Date Added is required and must be valid." });
    }
    const finalDate = rawDate;
    let givenBook;
    Book.findOne({
    where: { id: bookId },
    })
    .then((data)=>{
      if (data) {
        givenBook = data;
      } else {
        res.status(404).send({
          message: `Cannot find Book with id=${bookId}.`,
        });
        return;
      }
    });
    //create the WishlistBook
    const newWishlistBook = {
      userId,
      bookId: bookId,
      dateAdded: finalDate,
    };
    const createdWishlistBook = await WishlistBook.create(newWishlistBook);
    res.status(201).json(createdWishlistBook);
    return;
  } catch (err) {
    console.error("Error during create:", err);
    res.status(500).json({
      message: err.message || "Failed to create Wishlist Book"
    });
    return;
  }
};

exports.findAll = async (req, res) => {
  try {
    const userId = await getUserIdFromToken(req);
    // Fetch only the Wishlist Books for the authenticated user
    const data = await WishlistBook.findAll({
      where: { userId: userId},
      include: [
        {
          model: db.book,
          as: 'book',
          include: [ 
            {
              model: db.author,
              as: 'authors'
            },
            {
              model: db.genre,
              as: 'genres'
            }
          ],
        },
      ],
    });

    res.send(data);
  } catch (err) {
    console.error("Error in findAll:", err);
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving Wishlisted Books.",
    });
  }
};

exports.update = async (req, res) => {
  const id = req.params.id;
  const rawDate = req.body.dateAdded;
    if (!rawDate || rawDate === "Invalid date" || isNaN(Date.parse(rawDate))) {
      return res.status(400).json({ message: "Date Added is required and must be valid." });
    }
  const finalDate = rawDate;
  try {
    const wishlistBook = await WishlistBook.findByPk(id);
    if (!wishlistBook) {
      return res.status(404).json({ message: "Wishlist Book not found" });
    }
    await WishlistBook.update(
      {
        dateAdded: finalDate
      },
      { where: { id } }
    );

    res.status(200).json({ message: "Wishlist Book updated" });
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ message: err.message || "Error updating data" });
    }
};

// Delete a WishlistBook with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  WishlistBook.destroy({
    where: { id: id },
  })
    .then((number) => {
      if (number == 1) {
        res.send({
          message: "Wishlist Book was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Wishlist Book with id=${id}. Maybe Wishlist Book was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Could not delete Wishlist Book with id=" + id,
      });
    });
};
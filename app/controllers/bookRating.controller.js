const db = require("../models");
const bookRating = db.BookRating;
const Op = db.Sequelize.Op;
const { decrypt } = require("../authentication/crypto");
const getUserIdFromToken = require("../utils/getUserIdFromToken");
const Session = db.session;

exports.create = async (req, res) => {
try{ 
    
    const userId = await getUserIdFromToken(req);
      
    if (req.body.score !== "" && !/^(10|[1-9])$/.test(req.body.score)) {
        return res.status(400).json({message: "Rating can only be a whole number from 1 to 10 or left blank"});
    }
    
    //create the rating entry
    const newBookRating = {
        userId,
        ownedBookId: req.body.ownedBookId,
        score: req.body.score,
        description: req.body.description,
        dateAdded: req.body.dateAdded
    };

    const createdBookRating = await bookRating.create(newBookRating);
    res.status(201).json(createdBookRating);
    
  } catch (err) {
    console.error("Error during creation of rating:", err);
    res.status(500).json({
      message: err.message || "Failed to create BookRating"
    });
  }
};

exports.update = async (req, res) => {
  try{ 
    const ownedBookId = req.body.ownedBookId;

    const existingRating = await bookRating.findOne({ where: { ownedBookId } });

    if (!existingRating) {
        return res.status(404).json({ message: "BookRating not found for this owned book" });
    }
      
    if (req.body.score !== "" && !/^(10|[1-9])$/.test(req.body.score)) {
        return res.status(400).json({message: "Rating can only be a whole number from 1 to 10 or left blank"});
    }
      
    //create the book rating entry
    await existingRating.update(
      {
      score: req.body.score,
      description: req.body.description,
      }
    );

    res.status(200).json(existingRating);
    
  } catch (err) {
    console.error("Error during updating of rating:", err);
    res.status(500).json({
      message: err.message || "Failed to update BookRating"
    });
  }
};

// Delete a book rating with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  bookRating.destroy({
    where: { id: id },
  })
    .then((number) => {
      if (number == 1) {
        res.send({
          message: "bookRating was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete bookRating with id=${id}. Maybe bookRating was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Could not delete bookRating with id=" + id,
      });
    });
};
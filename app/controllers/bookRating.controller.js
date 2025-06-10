const db = require("../models");
const bookRating = db.BookRating;
const Op = db.Sequelize.Op;
const { decrypt } = require("../authentication/crypto");
const getUserIdFromToken = require("../utils/getUserIdFromToken");
const Session = db.session;

exports.create = async (req, res) => {
    
    const userId = await getUserIdFromToken(req);
    
    //create the rating entry
    const newBookRating = {
        userId,
        ownedBookId: req.body.ownedBookId,
        score: req.body.score,
        description: req.body.description,
        dateAdded: req.body.dateAdded
    };


    // Save book rating in the database
    bookRating.create(newBookRating)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
            message:
            err.message || "Some error occurred while creating the book rating.",
            });
        });

};

exports.update = async (req, res) => {
    try{ 
        const ownedBookId = req.body.ownedBookId;

        const existingRating = await bookRating.findOne({ where: { ownedBookId } });

        if (!existingRating) {
            return res.status(404).json({ message: "BookRating not found for this owned book" });
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
            message: err.message || "Could not delete bookRating with id=" + id,});
        });
};
const db = require("../models");
const OwnedBook = db.OwnedBook;
const Book = db.Book;
const BookRating = db.BookRating;
const ReadingStatusTypes = db.ReadingStatusTypes;
const Op = db.Sequelize.Op;
const { decrypt } = require("../authentication/crypto");
const getUserIdFromToken = require("../utils/getUserIdFromToken");
const Session = db.session;

exports.create = async (req, res) => {
try{ 
 
    const userId = await getUserIdFromToken(req);

    // Validate request
    if (req.body.title === undefined || req.body.title === "" || req.body.title === null) {
      return res.status(400).json({ message: "Title can't be empty!" });
    } else if (isNaN(req.body.numPages)) {
      return res.status(400).json({ message: "No letters in number fields! 1.1" });
    } else if (req.body.paidAmount !== "" && req.body.paidAmount !== null && isNaN(parseFloat(req.body.paidAmount))) {
      return res.status(400).json({ message: "No letters in number fields! 1.2" });
    }   
      
    const paid = req.body.paidAmount.toString();
    if (req.body.paidAmount !== "" && req.body.paidAmount !== null && !/^\d+(\.\d{1,2})?$/.test(paid )) {
      return res.status(400).json({ message: "Purchase Price can have at most two decimal places!" });
    }

    const finalPaidAmount = req.body.paidAmount === "" ? null : parseFloat(req.body.paidAmount);

    const rawDateBought = req.body.dateBought;
    const finalDateBought = (!rawDateBought || rawDateBought === "Invalid date" || isNaN(Date.parse(rawDateBought)))
      ? null
      : rawDateBought;
    
    const rawPublicationDate = req.body.publicationDate;
    if (!rawPublicationDate || rawPublicationDate === "Invalid date" || isNaN(Date.parse(rawPublicationDate))) {
      return res.status(400).json({ message: "Publication Date is required and must be valid." });
    }

    const finalPublicationDate = rawPublicationDate;
  
    if (req.body.score !== "" && req.body.score !== null && !/^(10|[1-9])$/.test(req.body.score)) {
      return res.status(400).json({message: "Rating can only be a whole number from 1 to 10 or left blank"});
    }
    //end of validation
  
  
    //Create the book
    const newBook = await Book.create({
      title: req.body.title,
      numPages: req.body.numPages,
      publicationDate: finalPublicationDate,
      link: req.body.link
    });

    //create the owned book
    const newOwnedBook = {
      userId,
      bookId: newBook.id,
      readingStatusTypesId: req.body.readingStatusTypesId || 1,
      paidAmount: finalPaidAmount,
      dateBought: finalDateBought,
      userNotes: req.body.userNotes,
    };
  
    const createdOwnedBook = await OwnedBook.create(newOwnedBook);
  
    //create the book rating entry
    const newOwnedBookRating = await BookRating.create({
      userId,
      ownedBookId: createdOwnedBook.id,
      score: req.body.score,
      description: req.body.description,
      dateAdded: new Date().toISOString().split('T')[0]
    });
  
    res.status(201).json({
      ownedBook: createdOwnedBook,
      bookRating: newOwnedBookRating
    });
    
  } catch (err) {
    console.error("Error during create:", err);
    res.status(500).json({
      message: err.message || "Failed to create OwnedBook"
    });
  }
};


exports.findAll = async (req, res) => {
  try {
    const userId = await getUserIdFromToken(req);

    // Fetch only the OwnedBooks for the authenticated user
    const data = await OwnedBook.findAll({
      where: { userId: userId},
      include: [
        {
          model: db.Book,
        },
        {
          model: db.ReadingStatusTypes,
        },
        {
          model: db.BookRating,
        }
      ]
    });

    res.send(data);
  } catch (err) {
    console.error("Error in findAll:", err);
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving Owned Books.",
    });
  }
};

exports.update = async (req, res) => {
  const id = req.params.id;

  //Validate data entry
  if (isNaN(req.body.paidAmount)) {
    return res.status(400).json({ message: "No letters in number fields!" });
  }     
    
  if (req.body.paidAmount !== "" && req.body.paidAmount !== null && !isNaN(req.body.paidAmount) && !/^\d+(\.\d{1,2})?$/.test(req.body.paidAmount)) {
    return res.status(400).json({ message: "Purchase Price can have at most two decimal places!" });
  }

  let finalPaidAmount = null;

  if (req.body.paidAmount !== "" && req.body.paidAmount !== null) {
    const parsed = parseFloat(req.body.paidAmount);
    if (!isNaN(parsed)) {
      finalPaidAmount = parsed;
    }
  }
  const rawDate = req.body.dateBought;
  const finalDate = (!rawDate || rawDate === "Invalid date" || isNaN(Date.parse(rawDate)))
    ? null
    : rawDate;
  
  if (req.body.score !== "" && req.body.score !== null && !/^(10|[1-9])$/.test(req.body.score)) {
    return res.status(400).json({message: "Rating can only be a whole number from 1 to 10 or left blank"});
  }
  //end of validation

  try {
    const ownedBook = await OwnedBook.findByPk(id);
    if (!ownedBook) {
      return res.status(404).json({ message: "OwnedBook not found" });
    }

    //update the book rating entry
    await BookRating.update(
      {
        score: req.body.score,
        description: req.body.description,
      },
      { where: { ownedBookId: id } }
    );

    await OwnedBook.update(
      {
        paidAmount: finalPaidAmount,
        dateBought: finalDate,
        userNotes: req.body.userNotes,
        readingStatusTypesId: req.body.readingStatusTypesId,
      },
      { where: { id } }
    );

    res.status(200).json({ message: "Book and OwnedBook updated" });
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ message: err.message || "Error updating data" });
    }
};

// Delete an OwnedBook with the specified id in the request
exports.delete = async (req, res) => {
  const id = req.params.id;

  await BookRating.destroy({ where: { ownedBookId: id } });

  OwnedBook.destroy({
    where: { id: id },
  })
    .then((number) => {
      if (number == 1) {
        res.send({
          message: "OwnedBook was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete OwnedBook with id=${id}. Maybe OwnedBook was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Could not delete OwnedBook with id=" + id,
      });
    });
};
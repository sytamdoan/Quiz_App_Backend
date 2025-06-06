const db = require("../models");
const OwnedBook = db.OwnedBook;
const Book = db.Book;
const ReadingStatusTypes = db.ReadingStatusTypes;
const Op = db.Sequelize.Op;
const { decrypt } = require("../authentication/crypto");
const getUserIdFromToken = require("../utils/getUserIdFromToken");
const Session = db.session;


exports.create = async (req, res) => {
  try {
    const userId = await getUserIdFromToken(req);

    // Validation
    if (!req.body.title) {
      return res.status(400).json({ message: "Title can't be empty broooo!" });
    }
    if (isNaN(req.body.numPages) || isNaN(req.body.paidAmount)) {
      return res.status(400).json({ message: "No letters in number fields broooo!" });
    }

    //console.log("userId inside of the controller:", userId);

    // Create the Book
    const newBook = await Book.create({
      title: req.body.title,
      numPages: req.body.numPages,
      link: req.body.link,
    });

exports.create = (req, res) => {
  // Validate request
  if (req.body.title === undefined || req.body.title === "" || req.body.title === null) {
    return res.status(400).json({ message: "Title can't be empty!" });
  } else if (isNaN(req.body.numPages) || isNaN(req.body.paidAmount)) {
    return res.status(400).json({ message: "No letters in number fields!" });
  }   
    
  if (req.body.paidAmount !== "" && !/^\d+(\.\d{1,2})?$/.test(req.body.paidAmount)) {
    return res.status(400).json({ message: "Purchase Price can have at most two decimal places!" });
  }

  const finalPaidAmount = req.body.paidAmount === "" ? null : parseFloat(req.body.paidAmount);
  const rawDate = req.body.dateBought;
  const finalDate = (!rawDate || rawDate === "Invalid date" || isNaN(Date.parse(rawDate)))
    ? null
    : rawDate;

  Book.create({
    title: req.body.title,
    numPages: req.body.numPages,
    link: req.body.link
  })
  .then((newBook) => {
    const newOwnedBook = {
      userId: userId,
      bookId: newBook.id,
      readingStatusTypesId: req.body.readingStatusTypesId || 1,
      paidAmount: req.body.paidAmount,
      dateBought: req.body.dateBought,
      userNotes: req.body.userNotes,
    };

    const createdOwnedBook = await OwnedBook.create(newOwnedBook);
    res.status(201).json(createdOwnedBook);
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
    //console.log("Fetched books for userId:", userId);

    // Fetch only the OwnedBooks for the authenticated user
    const data = await OwnedBook.findAll({
      where: { userId: userId},
      include: [
        {
          model: db.Book,
          //required: true,
        },
        {
          model: db.ReadingStatusTypes,
        },
      ],
    });

//    console.log(`Returned ${data.length} books for user ${userId}`);

    res.send(data);
  } catch (err) {
    console.error("Error in findAll:", err);
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving Owned Books.",
    });
  }
};

// // Find a single OwnedBook with an id
// exports.findOne = (req, res) => {
//   const id = req.params.id;

//   OwnedBook.findByPk(id)
//     .then((data) => {
//       res.send(data);
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message: err.message || "Error retrieving an Owned Book with id=" + id,
//       });
//     });
// };

exports.update = async (req, res) => {
  const id = req.params.id;
    
  if (req.body.title === undefined || req.body.title === "" || req.body.title === null) {
    return res.status(400).json({ message: "Title can't be empty!" });
  } else if (isNaN(req.body.numPages) || isNaN(req.body.paidAmount)) {
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

  try {
    const ownedBook = await OwnedBook.findByPk(id);
    if (!ownedBook) {
      return res.status(404).json({ message: "OwnedBook not found" });
    }

    const bookId = ownedBook.bookId;
    const bookData = req.body.book || {};
    await Book.update(
      {
        title: bookData.title,
        numPages: bookData.numPages,
        link: bookData.link,
      },
      { where: { id: bookId } }
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

// Delete a OwnedBook with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

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
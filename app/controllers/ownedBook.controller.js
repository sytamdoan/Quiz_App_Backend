const db = require("../models");
const OwnedBook = db.OwnedBook;
const Book = db.Book;
const ReadingStatusTypes = db.ReadingStatusTypes;
const Op = db.Sequelize.Op;
const { decrypt } = require("../authentication/crypto");
const Session = db.session;

exports.create = async (req, res) => {
  try {
    //Get userId from token
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    const sessionId = await decrypt(token);
    const session = await Session.findByPk(sessionId);
    if (!session || !session.userId) {
      return res.status(401).json({ message: "Invalid session" });
    }

    const userId = session.userId;

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

    //Create the OwnedBook
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
    // Get userId from token
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    const sessionId = await decrypt(token);
    const session = await Session.findByPk(sessionId);
    if (!session || !session.userId) {
      return res.status(401).json({ message: "Invalid session" });
    }

    const userId = session.userId;
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
    return res.status(400).json({ message: "Title can't be empty broooo!" });
  } else if (isNaN(req.body.numPages) || isNaN(req.body.paidAmount)) {
    return res.status(400).json({ message: "No letters in number fields broooo!" });
  }     

  try {
    const ownedBook = await OwnedBook.findByPk(id);
    if (!ownedBook) {
      return res.status(404).json({ message: "OwnedBook not found" });
    }

    const bookId = ownedBook.Bookid;
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
        paidAmount: req.body.paidAmount,
        dateBought: req.body.dateBought,
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
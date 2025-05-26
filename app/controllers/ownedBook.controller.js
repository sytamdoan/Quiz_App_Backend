const db = require("../models");
const OwnedBook = db.OwnedBook;
const Book = db.Book;
const ReadingStatusTypes = db.ReadingStatusTypes;
const Op = db.Sequelize.Op;

 exports.create = (req, res) => {
  Book.create({
    title: req.body.title,
    numPages: req.body.numPages,
    link: req.body.link
  })
  .then((newBook) => {
    // Step 2: Use newBook.id to link to OwnedBook
    const newOwnedBook = {
      Userid: 1, // Replace with session value later
      Bookid: newBook.id,
      ReadingStatusTypesid: req.body.ReadingStatusTypesid || 1,
      paidAmount: req.body.paidAmount,
      dateBought: req.body.dateBought,
      userNotes: req.body.userNotes,
    };

    // Step 3: Create OwnedBook
    return OwnedBook.create(newOwnedBook);
  })
  .then((createdOwnedBook) => {
    res.status(201).json(createdOwnedBook);
  })
  .catch((err) => {
    console.error("Error during create:", err);
    res.status(500).json({
      message: err.message || "Failed to create OwnedBook"
    });
  });
};

// Retrieve all OwnedBooks from the database.
exports.findAll = (req, res) => {
  const OwnedBookId = req.query.OwnedBookId;
  var condition = OwnedBookId ? { id: { [Op.like]: `%${OwnedBookId}%` } } : null;

    OwnedBook.findAll({
        where: condition,
        include: [
            {
                model: db.Book,
                required: true
             },
            {
                model: db.ReadingStatusTypes,
                required: true
            }
        ]
    })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Owned Books.",
      });
    });
};

// Find a single OwnedBook with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  OwnedBook.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error retrieving an Owned Book with id=" + id,
      });
    });
};

exports.update = async (req, res) => {
    const id = req.params.id;
    const paidAmount = parseInt(req.body.paidAmount, 10);
    const numPages = parseInt(req.body.Book?.numPages, 10);
    const statusId = parseInt(req.body.ReadingStatusTypesid, 10);
    
    // Validate
    if (!req.body.Book?.title || req.body.Book?.title.trim() === "") {
        return res.status(400).json({ message: "Title can't be empty!" });
        }
    
    if (isNaN(paidAmount) || isNaN(numPages) || isNaN(statusId)) {
        return res.status(400).json({ message: "One or more numeric fields are invalid." });
    }

  try {
    const ownedBook = await OwnedBook.findByPk(id);
    if (!ownedBook) {
      return res.status(404).json({ message: "OwnedBook not found" });
    }

    const bookId = ownedBook.Bookid;
    await Book.update(
      {
        title: req.body.Book?.title,
        numPages: req.body.Book?.numPages,
        link: req.body.Book?.link,
      },
      { where: { id: bookId } }
    );

    await OwnedBook.update(
      {
        paidAmount: req.body.paidAmount,
        dateBought: req.body.dateBought,
        userNotes: req.body.userNotes,
        ReadingStatusTypesid: req.body.ReadingStatusTypesid,
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
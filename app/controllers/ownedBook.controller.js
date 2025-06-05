const db = require("../models");
const OwnedBook = db.OwnedBook;
const Book = db.Book;
const ReadingStatusTypes = db.ReadingStatusTypes;
const Op = db.Sequelize.Op;

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
      Userid: 1, // Replace with session value later
      Bookid: newBook.id,
      ReadingStatusTypesid: req.body.ReadingStatusTypesid || 1,
      paidAmount: finalPaidAmount,
      dateBought: finalDate,
      userNotes: req.body.userNotes,
    };
      
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
        paidAmount: finalPaidAmount,
        dateBought: finalDate,
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
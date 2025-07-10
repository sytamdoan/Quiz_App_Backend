const db = require("../models");
const Quiz = db.quiz;
const Op = db.Sequelize.Op;

// Create and Save a new class
exports.create = async(req, res) => {
  // Validate request
  if (req.body.name === undefined || req.body.name === "" ||
    req.body.subject === undefined || req.body.subject === "" ||
    req.body.timeLimit === undefined || req.body.timeLimit === "" ||
    req.body.isResultsVisible === undefined || req.body.isResultsVisible === "" ||
    req.body.isAnonymous === undefined || req.body.isAnonymous === "" ||
    req.body.type === undefined || req.body.type === ""

  ) {
    const error = new Error("Fields cannot be empty");
    error.statusCode = 400;
    throw error;
  }

  // Create an Quiz
  const newQuiz = {
    classId: req.params.id,
    name: req.body.name,
    year: req.body.year,
    timeLimit: req.body.timeLimit,
    isResultsVisible: req.body.isResultsVisible,
    isAnonymous: req.body.isAnonymous,
    type: req.body.type,
    subject: req.body.subject
  };

  // Save class in the database
  Quiz.create(newQuiz)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Quiz.",
      });
    });
};

// Retrieve all Quiz from the database for this Class.
exports.findAll = async (req, res) => {
  searchClassID = req.params.id;

  Quiz.findAll({ where: {classId: searchClassID} })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving the classes.",
      });
    });
};

// Find a single Quiz with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Author.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error retrieving Author with id=" + id,
      });
    });
};

// Update a Quiz by the id in the request
exports.update = (req, res) => {

  const id = req.params.id;
  // Validate request
  if (req.body.name === undefined || req.body.name === "" ||
    req.body.subject === undefined || req.body.subject === "" ||
    req.body.timeLimit === undefined || req.body.timeLimit === "" ||
    req.body.isResultsVisible === undefined || req.body.isResultsVisible === "" ||
    req.body.isAnonymous === undefined || req.body.isAnonymous === "" ||
    req.body.type === undefined || req.body.type === ""

  ) {
    const error = new Error("Fields cannot be empty");
    error.statusCode = 400;
    throw error;
  }

  // Create an Quiz
  const updatedQuiz = {
    name: req.body.name,
    year: req.body.year,
    timeLimit: req.body.timeLimit,
    isResultsVisible: req.body.isResultsVisible,
    isAnonymous: req.body.isAnonymous,
    type: req.body.type,
    subject: req.body.subject
  };

  Quiz.update(updatedQuiz, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Quiz was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Quiz with id=${id}. Maybe Quiz was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating Author with id=" + id,
      });
    });
};

// Delete a Quiz with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Quiz.destroy({
    where: { id: id },
  })
    .then((number) => {
      if (number == 1) {
        res.send({
          message: "Quiz was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Quiz with id=${id}. Maybe Quiz was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Could not delete Quiz with id=" + id,
      });
    });
};

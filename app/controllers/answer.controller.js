const db = require("../models");
const Answer = db.answer;
const Op = db.Sequelize.Op;

// Create and Save a new answer
exports.create = async(req, res) => {
  // Validate request
  if (req.body.answerText === undefined || req.body.name === "" ||
    req.body.isCorrect === undefined || req.body.subject === ""
  ) {
    const error = new Error("Fields cannot be empty");
    error.statusCode = 400;
    throw error;
  }

  // Create an Answer
  const newAnswer = {
    classId: req.params.id,
    answerText: req.body.answerText,
    isCorrect: req.body.isCorrect,
  };

  // Save answer in the database
  Answer.create(newAnswer)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Answer.",
      });
    });
};

// Retrieve all Answers from the database for this Question.
exports.findAll = async (req, res) => {
  console.log("Hit");
  const searchQuestionID = req.params.id;

  Answer.findAll({ where: {questionId: searchQuestionID} })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving the answers.",
      });
    });
};

// Find a single Answer with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Answer.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error retrieving Answer with id=" + id,
      });
    });
};

// Update a Quiz by the id in the request
exports.update = (req, res) => {

  const id = req.params.id;
  // Validate request
  if ( req.body.answerText === undefined || req.body.name === "" ||
    req.body.isCorrect === undefined || req.body.subject === ""
  ) {
    const error = new Error("Fields cannot be empty");
    error.statusCode = 400;
    throw error;
  }

  // Create an Answer
  const updatedAnswer = {
    answerText: req.body.answerText,
    isCorrect: req.body.isCorrect,
  };

  Answer.update(updatedAnswer, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Answer was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Answer with id=${id}. Maybe Answer was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating Answer with id=" + id,
      });
    });
};

// Delete a Answer with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Answer.destroy({
    where: { id: id },
  })
    .then((number) => {
      if (number == 1) {
        res.send({
          message: "Answer was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Answer with id=${id}. Maybe Answer was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Could not delete Answer with id=" + id,
      });
    });
};

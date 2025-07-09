const db = require("../models");
const Question = db.question;
const Op = db.Sequelize.Op;
const getUserIdFromToken = require("../utils/getUserIdFromToken");

// Create and Save a new question
exports.create = async(req, res) => {
  // Validate request
  if (req.body.questionText === undefined || req.body.questionText === ""
  ) {
    const error = new Error("Fields cannot be empty");
    error.statusCode = 400;
    throw error;
  }

  // Create an Question
  const newQuestion = {
    quizId: req.body.quizId,
    questionText: req.body.questionText,
  };
  // Save Question in the database
  Question.create(newQuestion)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Question.",
      });
    });
};

// Retrieve all Question from the database for the quiz.
exports.findAllByQuizId = async (req, res) => {
  const quizId = req.params.quizId;
  Question.findAll({ where: {quizId} })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving the questions.",
      });
    });
};

// Find a single Question with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Question.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error retrieving Question with id=" + id,
      });
    });
};

// Update a Question by the id in the request
exports.update = (req, res) => {

  // Validate request
  if (req.body.questionText === undefined || req.body.questionText === ""
  ) {
    const error = new Error("Fields cannot be empty");
    error.statusCode = 400;
    throw error;
  }

  const id = req.params.id;
  
  const updatedQuestion = {
    questionText: req.body.questionText,
  };

  Question.update(updatedQuestion, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Question was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Question with id=${id}. Maybe Question was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating Question with id=" + id,
      });
    });
};

// Delete a Question with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Question.destroy({
    where: { id: id },
  })
    .then((number) => {
      if (number == 1) {
        res.send({
          message: "Question was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Question with id=${id}. Maybe Question was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Could not delete Question with id=" + id,
      });
    });
};

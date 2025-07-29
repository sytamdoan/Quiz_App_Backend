const db = require("../models");
const Answer = db.answer;
const Op = db.Sequelize.Op;
const checkEmpty = require("../utils/checkEmpty");

// Create and Save a new answer
exports.create = async(req, res) => {
  // Validate request
  if (req.body.answerText === undefined || req.body.answerText === "" ||
    req.body.isCorrect === undefined || req.body.isCorrect === ""
  ) {
    return res.status(500).send({
      message: "Fields cannot be empty.",
    });
  }

  // Create an Answer
  const newAnswer = {
    questionId: req.params.questionId,
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
  const searchQuestionID = req.params.questionId;

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

// Retrieve Answers by using req.body as a filter
exports.findAllByFilter = async (req, res) => {
  // Get data to filter for
  const filter = {};
  if (!checkEmpty(req.body.answerId)) {
    filter.answerId = req.body.answerId;
  }
  if (!checkEmpty(req.body.answerText)) {
    filter.answerText = {[Op.like]: '%'+req.body.answerText+'%'};
  }
  if (!checkEmpty(req.body.questionId)) {
    filter.questionId = req.body.questionId;
  }
  if (!checkEmpty(req.body.isCorrect)) {
    filter.isCorrect = req.body.isCorrect;
  }

  // Retrieve the answers using the filter
  Answer.findAll({ where: filter })
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      res.status(500).send({message: err.message || "Some error occurred"}) 
    })
}

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
  if (req.body.answerText === undefined || req.body.answerText === "" ||
    req.body.isCorrect === undefined || req.body.isCorrect === ""
  ) {
    return res.status(500).send({
      message: "Fields cannot be empty.",
    });
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

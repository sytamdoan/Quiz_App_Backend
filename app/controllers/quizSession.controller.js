const db = require("../models");
const QuizSession = db.quizSession;
const Op = db.Sequelize.Op;

// Create and Save a new question
exports.create = async(req, res) => {
  // Validate request
  if (req.body.entryCode === undefined || req.body.entryCode === ""
    || req.body.expirationDate === undefined || req.body.expirationDate === ""
  ) {
    res.status(500).send({
        message: "Fields cannot be empty.",
  });

    return;
  }

  // Create a QuizSession
  const newQuizSession = {
    quizId: req.params.quizId,
    entryCode: req.body.entryCode,
    expirationDate: req.body.expirationDate,
    isActive: 0
  };

  QuizSession.create(newQuizSession)
    .then((data) => {
        res.json(data);
    })
    .catch((err) => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the QuizSession." 
        })
    });
};

// Retrieve all QuizSessions from the database for the quiz.
exports.findAllByQuizId = async (req, res) => {
  const quizId = req.params.quizId;
  QuizSession.findAll({ where: {quizId} })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving the QuizSessions.",
      });
    });
};

// Find a single QuizSession with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  QuizSession.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error retrieving QuizSession with id=" + id,
      });
    });
};

// Update a QuizSession by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  const updatedQuizSession = {}


  if (!(req.body.entryCode === undefined || req.body.entryCode === ""))
  {
    updatedQuizSession.entryCode = req.body.entryCode;
  }
  if (!(req.body.expirationDate === undefined || req.body.expirationDate === ""))
  {
    updatedQuizSession.expirationDate = req.body.expirationDate;
  }
  if (!(req.body.isActive === undefined || req.body.isActive === ""))
  {
    updatedQuizSession.isActive = req.body.isActive
  }


  QuizSession.update(updatedQuizSession, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "QuizSession was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update QuizSession with id=${id}. Maybe QuizSession was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating QuizSession with id=" + id,
      });
    });
};

// Delete a QuizSession with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  QuizSession.destroy({
    where: { id: id },
  })
    .then((number) => {
      if (number == 1) {
        res.send({
          message: "QuizSession was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete QuizSession with id=${id}. Maybe QuizSession was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Could not delete QuizSession with id=" + id,
      });
    });
};
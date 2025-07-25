const db = require("../models");
const QuizSession = db.quizSession;
const Op = db.Sequelize.Op;
const makeCode = require("../utils/entryCodeGenerator");

// Create and Save a new QuizSession
exports.create = async(req, res) => {
     // Validate request
     if (req.body.quizId === undefined) { 
     const errorMsg = "Need associated Quiz";
     res.status(400).send({
          message: errorMsg,
     });
     return;
     }
     //IsActive, Expiration Date, and the Quiz code should all get set here
     let tomorrow = new Date();
     // add a day
     tomorrow.setDate(tomorrow.getDate() + 1);
     // Create an Quiz
     const newQuizSession = {
     quizId: req.body.quizId,
     isActive: true,
     expirationDate: tomorrow,
     entryCode: makeCode()
     };

     // Save class in the database
     QuizSession.create(newQuizSession)
     .then((data) => {
          res.json(data);
     })
     .catch((err) => {
          res.status(500).send({
          message:
               err.message || "Some error occurred while creating the QuizSession.",
          });
     });
};

// Find a single QuizSession with an id
exports.findOne = (req, res) => {
  const id = req.params.sessionId;

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
const db = require("../models");
const Quiz = db.quiz;
const Question = db.question;
const Answer = db.answer;
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
    const errorMsg = "Field(s) cannot be empty";
    res.status(400).send({
      message: errorMsg,
    });

    return;
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
    subject: req.body.subject,
    isEditable: true
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
  const searchClassID = req.params.id;

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
exports.findOneById = (req, res) => {
  const id = req.params.id;
  Quiz.findAll({
    where:null,
    include: ['question'],
  })
  .then((data) => {
    data = data.filter( c=>{
      return c.id == id;
    })[0];
    res.send(data);
  })
  .catch((err) => {
    res.status(500).send({
      message: err.message || "Error retrieving Quiz with Id=" + id,
    });
  });
};

// Find a single Quiz with a questionId
exports.findOneByQuestionId = (req, res) => {
  const questionId = req.params.questionId;
  Quiz.findAll({
    where:null,
    include: ['question'],
  })
  .then((data) => {
      data = data.filter( c=>{
        let filtered = c.question.filter(k => {
          return k.id == questionId;
        });
        return filtered.length == 1
      })[0];
      res.send(data);
  })
  .catch((err) => {
    res.status(500).send({
      message: err.message || "Error retrieving Quiz with questionId=" + questionId,
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
    const errorMsg = "Field(s) cannot be empty";
    res.status(400).send({
      message: errorMsg,
    });

    return;
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

exports.duplicateQuiz = async (req, res) => {
  const quizId = req.params.id;

  try {
    // Find the quiz you want to copy
    const originalQuiz = await Quiz.findByPk(quizId);
    if (!originalQuiz) return res.status(404).json({ message: "Original quiz not found." });

    // Create duplicate quiz
    const newQuiz = await Quiz.create({
      classId: originalQuiz.classId,
      name: originalQuiz.name + " (Copy)",
      year: originalQuiz.year,
      timeLimit: originalQuiz.timeLimit,
      isResultsVisible: originalQuiz.isResultsVisible,
      isAnonymous: originalQuiz.isAnonymous,
      type: originalQuiz.type,
      subject: originalQuiz.subject,
      isEditable: true
    });

    // Get all the questions that match the originalQuizID
    const questions = await Question.findAll({
      where: {
        quizId: originalQuiz.id
      }
    });

    for (const question of questions) {
      // Create duplicated questions to match the original quiz questions
      const newQuestion = await Question.create({
        quizId: newQuiz.id,
        questionText: question.questionText
      });

      // Get the answers for the questions from the original quiz answers
      const answers = await Answer.findAll({
        where: {
          questionId: question.id
        }
      });

      for (const answer of answers) {
        // Create duplicated answers from original
        await Answer.create({
          questionId: newQuestion.id,
          answerText: answer.answerText,
          isCorrect: answer.isCorrect
        });
      }
    }

    res.status(200).json({ message: "Quiz duplicated successfully", newQuizId: newQuiz.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to duplicate quiz", error: err.message });
  }
};

// Mark a quiz as having a session that has been started using it  (set isEditable to false)
exports.lockQuiz = async (req, res) => {
  const quizId = req.params.id;

  try {
    const [updated] = await Quiz.update(
      {
        isEditable: false
      },
      {
        where: { id: quizId }
      }
    );

    if (updated === 1) {
      res.send({ message: `Quiz ${quizId} started and isEditable set to false.` });
    } else {
      res.status(404).send({ message: `Quiz ${quizId} not found.` });
    }
  } catch (error) {
    res.status(500).send({ message: error.message || "Error locking quiz." });
  }
};
const db = require("../models");
const checkEmpty = require("../utils/checkEmpty");
const model = db.response;
const Op = db.Sequelize.Op;

// Create and Save a new response
exports.create = async(req, res) => {
  // Validate request
  if (checkEmpty(req.body.quizSessionId)
    || checkEmpty(req.body.questionId)
    || checkEmpty(req.body.answerId)) {
      res.status(400).send({ message: "Fields cannot be empty." })
      return;
  }
  
  const newResponse = {
    quizSessionId: req.body.quizSessionId,
    questionId: req.body.questionId,
    answerId: req.body.answerId,
    userId: req.body.userId
  }

  model.create(newResponse)
    .then((data) => {
      res.json(data)
    })
    .catch((err) => {
      res.status(500).send({message: "Some error occurred."})
    })
};

// Retrieve Responses by given filters
exports.findAll = async (req, res) => {
  // Collect filters
  const filter = {};
  if (!checkEmpty(req.query.quizSessionId)) {
    filter.quizSessionId = req.query.quizSessionId;
  }
  if (!checkEmpty(req.query.questionId)) {
    filter.questionId = req.query.questionId;
  }
  if (!checkEmpty(req.query.answerId)) {
    filter.answerId = req.query.answerId;
  }
  if (!checkEmpty(req.query.userId)) {
    filter.userId = req.query.userId;
  }

  model.findAll({ where: filter })
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      res.status(500).send({message: err.message || "Some error occurred"}) 
    })
}

// Find one item by id
exports.findOne = (req, res) => {
  const id = req.params.id;

  model.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error retrieving item with id=" + id,
      });
    });
}

// Update one item's answer
exports.update = (req, res) => {
  const id = req.params.id;
  const updatedResponse ={}

  if (!checkEmpty(req.body.answerId)) {
    updatedResponse.answerId = req.body.answerId;
  }

  model.update(updatedResponse, { where: {id: id} })
    .then((num) => {
      if (num == 1) {
        res.send({message: "Response was updated correctly."});
      } else {
        res.status(500).send({message: `Cannot update Response with id=${id}. Maybe Response was not found or req.body is empty!`})
      }
    })
    .catch((err) => {
      res.status(500).send({message: err.message || "Error updating Response with id=" + id});
    })
}

// Delete a item with specified id
exports.delete = (req, res) => {
  const id = req.params.id;

  model.destroy ({where: {id: id}})
    .then((num) => {
      if (num == 1) {
        res.send({message: "Response was deleted successfully!"})
      } else {
        res.status(500).send({message: `Cannot delete Response with id=${id}. Maybe QuizSession was not found!`})
      }
    })
    .catch((err) => {
      res.status(500).send({message: err.message || "Could not delete QuizSession with id" + id})
    })
}

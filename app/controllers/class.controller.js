const db = require("../models");
const Class = db.class;
const Op = db.Sequelize.Op;
const getUserIdFromToken = require("../utils/getUserIdFromToken");

// Create and Save a new class
exports.create = async(req, res) => {
  // Validate request
  if (req.body.name === undefined || req.body.name === "" ||
    req.body.year === undefined || req.body.year === ""
  ) {
    const error = new Error("Fields cannot be empty");
    error.statusCode = 400;
    throw error;
  }

  const userId = await getUserIdFromToken(req);

  // Create an Class
  const newClass = {
    userId,
    name: req.body.name,
    year: req.body.year,
  };
  // Save class in the database
  Class.create(newClass)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Class.",
      });
    });
};

// Retrieve all Class from the database for this user.
exports.findAll = async (req, res) => {
  const currentUserId = await getUserIdFromToken(req);

  Class.findAll({ where: {userId: currentUserId} })
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

// Find a single Class with an id
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

// Update a Class by the id in the request
exports.update = (req, res) => {

  // Validate request
  if (req.body.name === undefined || req.body.name === "" ||
    req.body.year === undefined || req.body.year === ""
  ) {
    const error = new Error("Fields cannot be empty");
    error.statusCode = 400;
    throw error;
  }

  const id = req.params.id;
  
  Class.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Class was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Class with id=${id}. Maybe Class was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating Author with id=" + id,
      });
    });
};

// Delete a Class with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Class.destroy({
    where: { id: id },
  })
    .then((number) => {
      if (number == 1) {
        res.send({
          message: "Class was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Class with id=${id}. Maybe Class was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Could not delete Class with id=" + id,
      });
    });
};

const db = require("../models");
const Publisher = db.publisher;
const Op = db.Sequelize.Op;

// Find all Created Publishers
exports.findAll = (req, res) => {
  Publisher.findAll({
    where:null,
  })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Created Publishers.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error retrieving Created Publishers.",
      });
    });
};

// Find Publisher by ID
exports.findOne = (req, res) => {
  const id = req.params.id;

  Publisher.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error retrieving Publisher with id=" + id,
      });
    });

}

// Create a Publisher
exports.create = (req, res) => {
  // Validate request
  if (req.body.name === undefined || req.body.name === "" || req.body.name === null) {
    const error = new Error("Name can't be empty!");
    error.statusCode = 400;
    throw error;
  }

  // Create an author
  const publisher = {
    name: req.body.name,
  };
  // Save Author in the database
  Publisher.create(publisher)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the publisher.",
      });
    });

}

// Update a Publisher
exports.update = (req, res) => {
  // Validate
  if (req.body.name === undefined || req.body.name === "" || req.body.name === null) {
    const error = new Error("Name cannot be empty!");
    error.statusCode = 400;
    throw error;
  }

  const id = req.params.id;
  const publisher = {
    name: req.body.name,
  }
  
  Publisher.update(publisher, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Publisher was updated successfully.",
        });
      } else if (num <= 0) {
        res.send({
          message: `Cannot update Publisher with id=${id}. Maybe Publisher was not found or req.body is empty!`,
        });
      } else {
        console.log(`Severe issue detected. Multiple rows in publisher with id=${id} were updated`);
        res.send({
          message: `Updated too many publishers. Severe issue logged.`
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating Publisher with id=" + id,
      });
    });
}

// Delete a Publisher
exports.delete = (req, res) => {
  const id = req.params.id;

  Publisher.destroy({
    where: { id: id },
  })
    .then((number) => {
      if (number == 1) {
        res.send({
          message: "Publisher was deleted successfully!",
        });
      } else if (number <= 0) {
        res.send({
          message: `Cannot delete Publisher with id=${id}. Maybe Publisher was not found!`,
        });
      } else {
        console.log(`Severe issue detected. Multiple rows in publisher with id=${id} were deleted`);
        res.send({
          message: `Deleted too many publishers. Severe issue logged.`
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Could not delete Publisher with id=" + id,
      });
    });
}
const Vans = require("../models/vans.model.js");

exports.create = (req, res) => {
  
};

exports.findAll = (req, res) => {
  
};

exports.findOne = (req, res) => {
  
};

exports.findAllSizes = (req, res) => {
  
};

exports.findAllColor = (req, res) => {
  
};

exports.update = (req, res) => {
  
};

exports.delete = (req, res) => {
  
};

exports.deleteAll = (req, res) => {
  
};

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const vans = new Vans({
    sneakerName: req.body.sneakerName,
    sneakerColor: req.body.sneakerColor,
    sneakerSize: req.body.sneakerSize,
    sneakerPrice: req.body.sneakerPrice
  });

  Vans.create(vans, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the vansSneaker."
      });
    else res.send(data);
  });
};

exports.findAll = (req, res) => {
  const sneakerName = req.query.sneakerName;

  Vans.getAll(sneakerName, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving vansSneakers."
      });
    else res.send(data);
  });
};

exports.findAllColor = (req, res) => {
  const sneakerColor = req.query.sneakerColor;

  Vans.getAllColor(sneakerColor, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving vansSneakers with color."
      });
    else res.send(data);
  });
};

exports.findAllSizes = (req, res) => {
  const sneakerSizes = req.query.sneakerSizes;

  Vans.getAllSizes(sneakerSizes, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving vansSneakers with color."
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
  Vans.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found vansSneaker with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving vansSneaker with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

exports.update = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Vans.updateById(
    req.params.id,
    new Vans(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found vansSneaker with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating vansSneaker with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

exports.delete = (req, res) => {
  Vans.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found vansSneaker with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete vansSneaker with id " + req.params.id
        });
      }
    } else res.send({ message: `vansSneaker was deleted successfully!` });
  });
};

exports.deleteAll = (req, res) => {
  Vans.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all vansSneakers."
      });
    else res.send({ message: `All vansSneakers were deleted successfully!` });
  });
};
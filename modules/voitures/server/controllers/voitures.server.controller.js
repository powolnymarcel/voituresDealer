'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Voiture = mongoose.model('Voiture'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create a voiture
 */
exports.create = function (req, res) {
  var voiture = new Voiture(req.body);
  voiture.user = req.user;

  voiture.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(voiture);
    }
  });
};

/**
 * Show the current voiture
 */
exports.read = function (req, res) {
  res.json(req.voiture);
};

/**
 * Update a voiture
 */
exports.update = function (req, res) {
  var voiture = req.voiture;

  voiture.title = req.body.title;
  voiture.content = req.body.content;

  voiture.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(voiture);
    }
  });
};

/**
 * Delete an voiture
 */
exports.delete = function (req, res) {
  var voiture = req.voiture;

  voiture.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(voiture);
    }
  });
};

/**
 * List of Voitures
 */
exports.list = function (req, res) {
  Voiture.find().sort('-created').populate('user', 'displayName').exec(function (err, voitures) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(voitures);
    }
  });
};

/**
 * Voiture middleware
 */
exports.voitureByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Voiture is invalid'
    });
  }

  Voiture.findById(id).populate('user', 'displayName').exec(function (err, voiture) {
    if (err) {
      return next(err);
    } else if (!voiture) {
      return res.status(404).send({
        message: 'No voiture with that identifier has been found'
      });
    }
    req.voiture = voiture;
    next();
  });
};

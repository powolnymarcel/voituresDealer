'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Voiture Schema
 */
var VoitureSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  titre: {
    type: String,
    default: 'Nouveau',
    trim: true,
    required: 'Le titre ne peut pas etre vide!'
  },
  type: {
    type: String,
    default: 'occasion',
    trim: true,
    required: 'Le Type ne peut pas etre vide!'
  },
  constructeur: {
    type: String,
    default: '',
    trim: true,
    required: 'Le constructeur ne peut pas etre vide!'
  },
  imageurl: {
    type: String,
    default: '',
    trim: true
  },
  modele: {
    type: String,
    default: '',
    trim: true,
    required: 'Le modele ne peut pas etre vide!'
  },
  contact_email: {
    type: String,
    default: '',
    trim: true,
    required: 'Le mail ne peut pas etre vide!'
  },
  province: {
    type: String,
    default: '',
    trim: true
  },
  description: {
    type: String,
    default: '',
    trim: true
  },
  annee: {
    type: String,
    default: '',
    trim: true
  },
  prix: {
    type: String,
    default: '',
    trim: true,
    required: 'Le prix doit etre présent!'
  },
  carburant: {
    type: String,
    default: '',
    trim: true
  },
  transmission: {
    type: String,
    default: '',
    trim: true
  },
  couleur: {
    type: String,
    default: '',
    trim: true
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Voiture', VoitureSchema);

'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Gallerie Schema
 */
var GallerieSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  url: {
    type: String,
    default:'',
    trim: true
  },
  voiture: { type: mongoose.Schema.Types.ObjectId, ref: 'Voiture' }


});

mongoose.model('Gallerie', GallerieSchema);

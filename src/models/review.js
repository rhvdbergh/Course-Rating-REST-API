'use strict';

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

// var User = require('./user.js');

  // Schema: Review
  var ReviewSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' }, 
    postedOn: { type: Date, default: Date.now },
    rating: { 
      type: Number, 
      required: true,
      min: [1, 'Rating must be between 1 and 5'],
      max: [5, 'Rating must be between 1 and 5'] }, 
    review: String
  });

module.exports = mongoose.model("Review", ReviewSchema);
  
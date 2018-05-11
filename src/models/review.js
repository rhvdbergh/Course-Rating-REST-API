'use strict';

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = require('./user.js');

  // Schema: Review
  var ReviewSchema = new Schema({
    user: { type: String }, // TODO: Schema.ObjectId, ref: UserSchema
    postedOn: { type: Date, default: Date.now },
    rating: { 
      type: Number, 
      required: true,
      min: [1, 'Rating must be between 1 and 5'],
      max: [5, 'Rating must be between 1 and 5'] }, 
    review: String
  });

module.exports = mongoose.model("Review", ReviewSchema);
  
'use strict';

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

// Schema: User
var UserSchema = new Schema({
    fullName: { type: String, required: true },
    emailAddress: { type: String, required: true, unique: true }, // TODO: needs email validation
    password: {type: String, required: true }
  });

  // Schema: Review
  var ReviewSchema = new Schema({
    user: { type: Schema.ObjectId, ref: UserSchema },
    postedOn: { type: Date, default: Date.now },
    rating: { type: Number, required: true }, // TODO: validate between 1 and 5
    review: String
  });

  // Schema: Course
  var CourseSchema = new Schema({
    user: { type: Schema.ObjectId, ref: UserSchema },
    title: { type: String, required: true },
    description: { type: String, required: true },
    estimatedTime: String,
    materialsNeeded: String,
    steps: [{ 
      stepNumber: Number, 
      title: { type: String, required: true }, 
      description: { type: String, required: true } 
    }], // array of objects
    reviews: [{ type: Schema.ObjectId, ref: ReviewSchema}]
  });

var Course = mongoose.model("Course", CourseSchema);
var Review = mongoose.model("Review", ReviewSchema);
var User = mongoose.model("User", UserSchema);

module.exports.Course = Course;
module.exports.Review = Review;
module.exports.User = User;
  
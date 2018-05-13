'use strict';

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

  // Schema: Course
  var CourseSchema = new Schema({ 
    user: { type: Schema.Types.ObjectId, ref: 'User' }, 
    title: { type: String, required: true },
    description: { type: String, required: true },
    estimatedTime: String,
    materialsNeeded: String,
    steps: [{ 
      stepNumber: Number, 
      title: { type: String, required: true }, 
      description: { type: String, required: true } 
    }], // array of objects
    reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }] 
  });

module.exports = mongoose.model("Course", CourseSchema);;
  
'use strict';

// load modules
var express = require('express');
var mongoose = require('mongoose');

var User = require('./models/user');
var Review = require('./models/review');
var Course = require('./models/course');

var seeder = require('mongoose-seed');
var data = require('./data/data.json');

var app = express();

// Connect to MongoDB via Mongoose
seeder.connect('mongodb://localhost/course_rating_api', function() {
 
  // Load Mongoose models
  seeder.loadModels([
    './src/models/user.js',
    './src/models/course.js',
    './src/models/review.js'    
  ]);
 
  // Clear specified collections
  seeder.clearModels(['User', 'Course', 'Review'], function() {
 
    // Callback to populate DB once collections have been cleared
    seeder.populateModels(data, function() {
      seeder.disconnect();
    });
 
  });
});

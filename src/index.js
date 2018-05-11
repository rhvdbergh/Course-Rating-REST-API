'use strict';

// load modules
var express = require('express');
var morgan = require('morgan');
var mongoose = require('mongoose');

var User = require('./models/user').User;
var Review = require('./models/review').Review;
var Course = require('./models/course').Course;

var seeder = require('mais-mongoose-seeder')(mongoose),
    data = require('./data/data.json');

var app = express();

// set up mongoose connection
mongoose.connect('mongodb://localhost/course_rating_api');
var db = mongoose.connection;
db.on('error', () => { console.log('There was an error connecting to the database.')});
db.once('open', () => {
  console.log('Database course_rating_api successfully connected.')

  // seeder.seed(data).then(function(dbData) {
  //   // The database objects are stored in dbData
  // }).catch(function(err) {
  //     // handle error
  // });

  

});



// set our port
app.set('port', process.env.PORT || 5000);

// morgan gives us http request logging
app.use(morgan('dev'));

// setup our static route to serve files from the "public" folder
app.use('/', express.static('public'));

// catch 404 and forward to global error handler
app.use(function(req, res, next) {
  var err = new Error('File Not Found');
  err.status = 404;
  next(err);
});

// Express's global error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

// start listening on our port
var server = app.listen(app.get('port'), function() {
  console.log('Express server is listening on port ' + server.address().port);
});

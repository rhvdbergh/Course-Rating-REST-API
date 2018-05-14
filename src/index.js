'use strict';

// load modules
var express = require('express');
var session = require('express-session');
var morgan = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var User = require('./models/user');
var Review = require('./models/review');
var Course = require('./models/course');

var app = express();

// use sessions
app.use(session({
  secret: 'no_secrets_here'
}));

// use bodyParser
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

// set up mongoose connection
mongoose.connect('mongodb://localhost/course_rating_api');
var db = mongoose.connection;
db.on('error', () => { console.log('There was an error connecting to the database.')});
db.once('open', () => {
  console.log('Database course_rating_api successfully connected.');
});

// set our port
app.set('port', process.env.PORT || 5000);

// morgan gives us http request logging
app.use(morgan('dev'));

// setup our static route to serve files from the "public" folder
app.use('/', express.static('public'));

// set up api routes router
const api_routes = require('./routes');
app.use('/api', api_routes);

// catch 404 and forward to global error handler
app.use(function(req, res, next) {
  var err = new Error('File Not Found');
  err.status = 404;
  next(err);
});

// Express's global error handler
app.use(function(err, req, res, next) {
  if (err.name === 'ValidationError') {
    res.status(400);
  } else {
    res.status(err.status || 500);
  }
  res.send(`Error: ${err}`);
});

// start listening on our port
var server = app.listen(app.get('port'), function() {
  console.log('Express server is listening on port ' + server.address().port);
});
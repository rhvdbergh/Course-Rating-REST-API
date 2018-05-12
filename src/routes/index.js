const express = require('express');
const router = express.Router(); // set up router

const mongoose = require('mongoose');

var User = require('../models/user');
var Review = require('../models/review');
var Course = require('../models/course');

// do this for all requests
router.use((req, res, next) => {
    console.log('Request to API path received.');

    next();
});

// GET /api/users 200
router.get('/users', (req, res, next) => {
    User.find().exec((err, users) => {
        if (err) {
            err.status = 500;
            next(err);
        }
        console.log(users);
        res.send(users);
    });
}); // end get users

// POST /api/users 201
router.post('/users', (req, res, next) => {

}); // end post users

// GET /api/courses 200
router.get('/courses', (req, res, next) => {

    res.send('courses');
}); // end get courses

// GET /api/courses/:courseId 200
router.get('/courses/:courseId', (req, res, next) => {

}); // end get :courseId

// POST /api/courses 201
router.post('/courses', (req, res, next) => {

}); // end post courses

// POST /api/courses/:courseId/reviews 201
router.post('/courses/:courseId/reviews', (req, res, next) => {

}); // end post reviews

// PUT /api/courses/:courseId 204
router.put('/courses/:courseId', (req, res, next) => {

}) // end put :courseId

module.exports = router;
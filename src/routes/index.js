const express = require('express');
const router = express.Router(); // set up router
const auth = require('basic-auth');

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

    const authUser = auth(req);

    if (authUser) {

        User.findOne({ emailAddress: authUser.name }, (err, user) => {
            if (err) { // check for general errors and pass on
                err.status = 500;
                next(err);
            }

            if (!user) { // no user was found
                res.send('User not found.');
            } else {
                res.send(user);
            }
        }); // end User.findOne
    } else { // end if user
        res.send('User not authenticated.');
    }
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
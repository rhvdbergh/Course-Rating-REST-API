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

    if (!authUser) { // no authentication data received
        const err = new Error('No user authentication data received.');
        next(err);
    } else {
        User.authenticate(authUser.name, authUser.pass, function(err, user) {
            if (err) {
                err.status = 500;
                next(err);
            }
            if (!user) { // no user was found
                const err = new Error('User not found');
                err.status = 401;
                next(err);
            } else {
                res.send(user);
            }
        });
    } // end else
}); // end get users

// POST /api/users 201
router.post('/users', (req, res, next) => {

    User.create({ 
        fullName: req.body.fullName,
        emailAddress: req.body.emailAddress,
        password: req.body.password
    }, function(err, user) {
        if (err) { 
            next(err);
        } else {
            console.log('New user created: ', req.body.fullName);
            res.location('/');
            res.end();
        }
    });

}); // end post users

// GET /api/courses 200
router.get('/courses', (req, res, next) => {

    Course.find({}, 'title')
        .exec(function(err, courses) {
            if (err) {
                next(err);
            } else {
                res.json(courses);
            }
        })

}); // end get courses

// GET /api/courses/:courseId 200
router.get('/courses/:courseId', (req, res, next) => {

    Course.findOne({ _id: req.params.courseId })
        .populate('user reviews')
        .exec(function(err, course) {
            if (err) {
                next(err);
            } else {
                res.json(course);
            }
        })
}); // end get :courseId

// POST /api/courses 201
router.post('/courses', (req, res, next) => {
    Course.create({
        title: req.body.title,
        description: req.body.description,
        user: req.body.user,
        steps: req.body.steps
    }, function(err, course) {
        if (err) { 
            next(err); 
        } else {
            console.log('New course created: ', course.title);
            res.location(`/api/courses/${course._id}`);
            res.status(201);
            res.end();
        }
    });

}); // end post courses

// POST /api/courses/:courseId/reviews 201
router.post('/courses/:courseId/reviews', (req, res, next) => {

}); // end post reviews

// PUT /api/courses/:courseId 204
router.put('/courses/:courseId', (req, res, next) => {

    Course.findById(req.params.courseId, function(err, course) {
        if (err) {
            next(err);
        } else {
            course.set({
                title: req.body.title,
                description: req.body.description,
                user: req.body.user,
                steps: req.body.steps
            });
            course.save(function (err, course) {
                if (err) {
                    next(err);
                } else {
                    res.status(204);
                    res.end();
                }
            });
        }
    });
}); // end put :courseId

module.exports = router;
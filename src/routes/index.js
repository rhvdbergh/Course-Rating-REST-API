const express = require('express');
const router = express.Router(); // set up router
const auth = require('basic-auth');

const mongoose = require('mongoose');

var User = require('../models/user');
var Review = require('../models/review');
var Course = require('../models/course');

// authenticate user for all requests
const authenticate = (req, res, next) => {
    console.log('Request to API path received.');

    const authUser = auth(req);

    if (!authUser) { // no authentication data received
        const err = new Error('No user authentication data received.');
        err.status = 400;
        next(err); 
    } else {
        User.authenticate(authUser.name, authUser.pass, function(err, user) {
            if (err) {
                next(err);
            }
            if (!user) { // no user was found
                const err = new Error('User not found. Please authenticate with a different user or create new user.');
                err.status = 401;
                next(err);
            }
            req.body.user = user;
            next();
        });
    }
};

// GET /api/users 200
router.get('/users', authenticate, (req, res, next) => {

    res.json(req.body.user);

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
            res.status(201);
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
router.post('/courses', authenticate, (req, res, next) => {
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
router.post('/courses/:courseId/reviews', authenticate, (req, res, next) => {

    // test to see if the course exists
    Course.findById(req.params.courseId, function(err, course) {
        if (err) {
            next(err)
        } else {
            Review.create({
                user: req.body.user._id,
                rating: req.body.rating,
                review: req.body.review
            }, function(err, review) {
                if (err) {
                    next(err)
                } else {
                    console.log('New review created.');
                    // now associate the review with the course
                    course.set({
                        reviews: [...course.reviews, review]
                    });
                    course.save(function(err, course) {
                        if (err) {
                            next(err);
                        } else {
                            res.location(`/api/courses/${req.params.courseId}`);
                            res.status(201);
                            res.end();
                        }
                    });
                }
            }); // end Review.create
        }
    }); // end Course.findById
}); // end post reviews

// PUT /api/courses/:courseId 204
router.put('/courses/:courseId', authenticate, (req, res, next) => {

    Course.findById(req.params.courseId, function(err, course) {
        if (err) {
            next(err);
        } else if (!course) {
            const err = new Error('Course does not exist');
            err.status = 400;
            next(err);
        } else {
            // only update fields that have been entered by user and passed
            // through the req.body
            let updateFields = {};
            if (req.body.title) { updateFields.title = req.body.title };
            if (req.body.description) { updateFields.description = req.body.description }
            if (req.body.steps) { updateFields.steps = req.body.steps }

            course.set(updateFields);
            
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
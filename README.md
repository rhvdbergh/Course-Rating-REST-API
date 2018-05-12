# Course-Rating-REST-API
Treehouse Techdegree Project 11: Course Rating REST API built with Express / MongoDB / Mongoose / Node.js
- Ronald van der Bergh

# Treehouse description
In this project, you’ll create a REST API using Express. The API will provide a way for users to review educational courses: users can see a list of courses in a database; add courses to the database; and add reviews for a specific course.

To complete this project, you’ll use your knowledge of REST API design, Node.js, and Express to create API routes, along with Mongoose and MongoDB for data modeling, validation, and persistence.

# Extra credit
I am aiming for an "exceeds expectations" grade with this Treehouse project.
- Validation will be added to prevent users from rating their own course.
- Tests that requests to GET api/users with the correct credentials returns a corresponding user document, and with invalid credentials, a 401 status error is returned
- A single course returned through GET /api/courses/:courseId will through Mongoose deep population return only the fullName of the user on the course model and each review returned with the course model. 

# Requirements
## Database
- Use Mongoose to connect to your MongoDB database, writing a message to indicate whether the connection was successful or not

## Mongoose schema and models
- User schema includes: _id (ObjectId, automatically generated), fullName (String, required), emailAddress (String, required, unique and correct format), password (String, required)
- Course: _id (ObjectId, automatically generated), user (_id from the users collection), title (String, required), description (String, required), estimatedTime (String), materialsNeeded (String), steps (Array of objects that includes stepNumber (Number), title (String, required), and description (String, required) properties), reviews (Array of ObjectID values, _id values from the reviews collection)
- Review: _id (ObjectId, automatically generated), user (_id from the users collection), postedOn (Date, defaults to "now"), rating (Number, required, must be between 1 and 5), review (String)

## Seed
- seed data available at src/data/data.json. (The Treehouse instructions suggests using the `mongoose-seeder` npm package, but this package does not work with Mongoose 5+. Rather, I used `mongoose-seed` and had to manipulate the seed data to work with this seeder)

## User routes
- GET /api/users 200 - Returns the currently authenticated user
- POST /api/users 201 - Creates a user, sets the Location header to "/", and returns no content

## Course routes
- GET /api/courses 200 - Returns the Course "_id" and "title" properties
- GET /api/course/:courseId 200 - Returns all Course properties and related documents for the provided course ID
- When returning a single course for the GET /api/courses/:courseId route, use Mongoose population to load the related user and reviews documents.
- POST /api/courses 201 - Creates a course, sets the Location header, and returns no content
- PUT /api/courses/:courseId 204 - Updates a course and returns no content
- POST /api/courses/:courseId/reviews 201 - Creates a review for the specified course ID, sets the Location header to the related course, and returns no content

## Validation - POST and PUT
- POST and PUT routes should use the `next` function to return error to the Express error handler; Mongoose validation errors have a 400 status code that should be sent back to the user

## Password
- User model should store the user's password as a hash with a pre-save hook using the `bcrypt` package

## Authentication mode
- Static method on user schema that takes an email, password and callback
- Get user from database with an email match
- If a user was found through an email match, check the password using `bcrypt` 
- If the user matches, return the correct user document, otherwise pass an error to the callback

## Permissions to require user sign-in
- Postman will send an Authorization header with each request when a user is signed in
- Add middleware to get user credentials from Authorization header set on the request
- Perhaps use the `basic-auth` npm package to parse the Authorization header into the user's credentials
- use the static method on user schema to check credentials against database
- If the authenticate method returns the user, then set the user document on the request so that each following middleware function has access to it.
- If the authenticate method returns an error, then pass it to the next function
- Use this middleware in the following routes: POST /api/courses || PUT /api/courses/:courseId || GET /api/users || POST /api/courses/:courseId/reviews

'use strict';

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

function validateEmail(email) {
  const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return regEx.test(email);
};

// Schema: User
var UserSchema = new Schema({
    fullName: { type: String, required: true },
    emailAddress: { 
      type: String, 
      required: true, 
      unique: true,
      validate: validateEmail
       }, 
    password: {type: String, required: true }
});

module.exports = mongoose.model("User", UserSchema);
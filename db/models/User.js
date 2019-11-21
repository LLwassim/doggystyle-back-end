// <<<<<<< HEAD
// const mongoose = require('../db/connection')
// const Dog = require("../models/Dog")
// const Schema = mongoose.Schema

// const user = new Schema ({
//     username: String,
//     password: String,
//     email: String,
//     location: String,
//     dogs: [Dog],
    

// })


// module.exports = mongoose.model('user', user)
// =======
const mongoose = require("../connection");
const Dog = require('./Dog').schema;

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    maxlength: 30
  },
  username: {
    type: String,
    maxlength: 30
  },
  password: {
    type: String,
    maxlength: 30
  },
  firstName: {
    type: String,
    maxlength: 30
  },
  lastName: {
    type: String,
    maxlength: 30
  },
  dogs: [Dog]
});

module.exports = mongoose.model("User", userSchema);
const mongoose = require('../db/connection')
const Dog = require("../models/Dog")
const Schema = mongoose.Schema

const user = new Schema ({
    username: String,
    password: String,
    email: String,
    location: String,
    dogs: [Dog],
    

})


module.exports = mongoose.model('user', user)
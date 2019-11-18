const mongoose = require('../db/Connection')

const Schema = mongoose.Schema

const user = new Schema ({
    username: String,
    password: String,
    email: String,
    location: String,
    dogs: Schema,
    

})


module.exports = mongoose.model('user', user)
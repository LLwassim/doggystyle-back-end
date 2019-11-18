const mongoose = require('../db/Connection')

const Schema = mongoose.Schema

const dogs = new Schema ({
    name: String,
    age: String,
    breed: Schema,
    personality: String,
    energy: String,

})


module.exports = mongoose.model('dogs', dogs)
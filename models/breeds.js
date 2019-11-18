const mongoose = require('../db/Connection')

const Schema = mongoose.Schema

const breeds = new Schema ({
    weight: String,
    height: String,
    name: Schema,
    breeding_group: String,
    temperement: Number,
    life_span:String,
    origin:String,

})


module.exports = mongoose.model('breeds', breeds)
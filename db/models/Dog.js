const mongoose = require("../connection");
const DogBreed = require('./DogBreed').schema;

const dogSchema = new mongoose.Schema({
  petName: {
    type: String,
    maxlength: 30
  },
  age: {
    type: Number,
    max: 30
  },
  energy_level: {
    type: Number,
    max: 6
  },
  breed: [DogBreed]
});

module.exports = mongoose.model("Dog", dogSchema);
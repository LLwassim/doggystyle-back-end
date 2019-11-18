const mongoose = require("../connection");
const DogBreed = require('./DogBreed').schema;

const dogSchema = new mongoose.Schema({
  petName: String,
  age: Number,
  energy_level: String,
  breed: [DogBreed]
});

module.exports = mongoose.model("Dog", dogSchema);
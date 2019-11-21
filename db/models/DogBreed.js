const mongoose = require("../connection");

const dogBreedSchema = new mongoose.Schema({
  id: Number,
  name: String, 
  temperament: Array,
  compatibleWith: Array
});

module.exports = mongoose.model("DogBreed", dogBreedSchema);
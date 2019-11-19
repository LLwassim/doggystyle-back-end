const mongoose = require("../connection");

const dogBreedSchema = new mongoose.Schema({
  name: String, 
  temperament: String,
  id: Number
});

module.exports = mongoose.model("DogBreed", dogBreedSchema);
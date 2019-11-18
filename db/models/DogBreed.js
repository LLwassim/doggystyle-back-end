const mongoose = require("../connection");

const dogBreedSchema = new mongoose.Schema({
  name: String, 
  temperament: String
});

module.exports = mongoose.model("DogBreed", dogBreedSchema);
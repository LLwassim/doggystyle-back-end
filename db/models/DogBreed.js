const mongoose = require("../connection");

const dogBreedSchema = new mongoose.Schema({
  weight: {
    imperial: String
  },
  height: {
    imperial: String
  },
  id: Number,
  name: String, 
  life_span: String, 
  temperament: String
});

module.exports = mongoose.model("DogBreed", dogBreedSchema);
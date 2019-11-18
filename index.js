const app = require('express')();
var cors = require('cors');
const parser = require('body-parser');
const DogBreed = require('./db/models/DogBreed');
const Dog = require('./db/models/Dog');

app.use(cors());
app.use(parser.json());

// get all breeds
app.get('/breeds', (req, res) => {
  DogBreed.find({}).then(dogBreeds => {
    res.json(dogBreeds);
  });
});

// get breeds by breed
app.get('/breeds/breed/:breed', (req, res) => {
  DogBreed.find({
    name: { $regex: req.params.breed, $options: 'i' }
  }).then(dogBreeds => {
    res.json(dogBreeds);
  });
});

// get breeds by temparament
app.get('/breeds/temperament/:temperament', (req, res) => {
  DogBreed.find({
    temperament: { $regex: req.params.temperament, $options: 'i' }
  }).then(dogBreeds => {
    res.json(dogBreeds);
  });
});

// get all dogs
app.get('/dogs', (req, res) => {
  Dog.find({}).then(dogs => {
    res.json(dogs);
  });
});

// create dog
app.post('/dogs/create', (req, res) => {
  Dog.create(req.body).then(dog => {
    res.json(dog);
  });
});

// update dog
app.put('/dogs/update/:id', (req, res) => {
  Dog.updateOne({ id: req.params.id }, req.body, { new: true }).then(dog => {
    res.json(dog);
  });
});

app.set("port", process.env.PORT || 8080);

app.listen(app.get("port"), () => {
  console.log(`PORT: ${app.get("port")}`);
});
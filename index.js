const app = require('express')();
var cors = require('cors');
const parser = require('body-parser');
const DogBreed = require('./db/models/DogBreed');
const Dog = require('./db/models/Dog');

app.use(cors());
app.use(parser.json());

app.get('/', (req, res) => {
  DogBreed.find({}).then(dogBreeds => {
    res.json(dogBreeds);
  });
});

app.get('/breed/:breed', (req, res) => {
  DogBreed.find({
    name: { $regex: req.params.breed, $options: 'i' }
  }).then(dogBreeds => {
    res.json(dogBreeds);
  });
});

app.get('/temperament/:temperament', (req, res) => {
  DogBreed.find({
    temperament: { $regex: req.params.temperament, $options: 'i' }
  }).then(dogBreeds => {
    res.json(dogBreeds);
  });
});

app.post('/', (req, res) => {
  Dog.create(req.body).then(dog => {
    res.json(dog);
  });
});

app.set("port", process.env.PORT || 8080);

app.listen(app.get("port"), () => {
  console.log(`PORT: ${app.get("port")}`);
});
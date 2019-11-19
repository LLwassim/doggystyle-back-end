const app = require('express')();
const cors = require('cors');
const parser = require('body-parser');
const DogBreed = require('./db/models/DogBreed');
const Dog = require('./db/models/Dog');
const User = require('./db/models/User');

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

// create dog
app.post('/dogs/create', (req, res) => {
  Dog.create(req.body).then(dog => {
    res.json(dog);
  });
});

// get all dogs
app.get('/dogs', (req, res) => {
  Dog.find({}).then(dogs => {
    res.json(dogs);
  });
});

// update dog
app.put('/dogs/update/:id', (req, res) => {
  Dog.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }).then(dog => {
    res.json(dog);
  });
});

// delete dog
app.delete('/dogs/delete/:id', (req, res) => {
  Dog.findOneAndDelete({ _id: req.params.id }).then(dog => {
    res.json(dog);
  });
});

// create user
app.post('/users/create', (req, res) => {
  User.find({ username: req.body.username })
  .then(foundUserName => {
    // if User.find(username) returns an empty array, create the user
    if (!foundUserName.length) {
      User.create(req.body)
      .then(user => {
        res.json(user);
      });
    // if User.find(username) returns a user, DONT create the user
    } else {
      res.send('username taken');    
    }
  });
});

// get user
app.get('/users/:username/:password', (req, res) => {
  User.find({ username: req.params.username, password: req.params.password }).then(user => {
    res.json(user);
  });
});

// update user
app.put('/users/update/:id', (req, res) => {
  User.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }).then(user => {
    res.json(user);
  });
});

// delete user
app.delete('/users/delete/:id', (req, res) => {
  User.findOneAndDelete({ _id: req.params.id }).then(user => {
    res.json(user);
  });
});

app.set("port", process.env.PORT || 8080);

app.listen(app.get("port"), () => {
  console.log(`PORT: ${app.get("port")}`);
});
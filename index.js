const app = require('express')();
const cors = require('cors');
const parser = require('body-parser');
const DogBreed = require('./db/models/DogBreed');
const Dog = require('./db/models/Dog');
const User = require('./db/models/User');
const passport = require('./config/passport')()
const userController = require('./controllers/users.js')

app.use(cors());
app.use(parser.json());

//password login initialization code
app.use(passport.initialize())

//users controller and routes
app.use('/users', userController)

/* BREEDS routes */
// get all breeds
app.get('/breeds', (req, res) => {
  DogBreed.find({})
  .then(dogBreeds => {
    res.json(dogBreeds);
  });
});
// get breeds by breed
app.get('/breeds/breed/:breed', (req, res) => {
  DogBreed.find({name: { $regex: req.params.breed, $options: 'i' }})
  .then(dogBreeds => {
    res.json(dogBreeds);
  });
});
// get breeds by temparament
app.get('/breeds/temperament/:temperament', (req, res) => {
  DogBreed.find({temperament: { $regex: req.params.temperament, $options: 'i' }})
  .then(dogBreeds => {
    res.json(dogBreeds);
  });
});

/* DOGS routes */
// get all dogs
app.get('/dogs', (req, res) => {
  Dog.find({})
  .then(dogs => {
    res.json(dogs);
  });
});

/* USERS routes */
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
// get user by username & password
app.get('/users/:username/:password', (req, res) => {
  User.find({ username: req.params.username, password: req.params.password })
  .then(user => {
    res.json(user);
  });
});
// get user by dog id
app.get('/users/:dogid', (req, res) => {
  User.find({ dogs: { $elemMatch: { _id: req.params.dogid }}})
  .then(user => {
    res.json(user);
  });
});
// update user
app.put('/users/update/:id', (req, res) => {
  User.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
  .then(user => {
    res.json(user);
  });
});
// update user - create dog within user & within dogs collection
app.post('/users/:id/dogs/create', (req, res) => {
  User.findOneAndUpdate({ _id: req.params.id }, { $push: { dogs: req.body }}, { new: true })
  .then(user => {
    let dog = {};
    dog.breed = user.dogs[user.dogs.length - 1].breed;
    dog._id = user.dogs[user.dogs.length - 1]._id;
    dog.petName = user.dogs[user.dogs.length - 1].petName;
    dog.age = user.dogs[user.dogs.length - 1].age;
    dog.energy_level = user.dogs[user.dogs.length - 1].energy_level;
    Dog.create(dog)
    .then(dog => {
      res.json(dog);
    });
  })
  .catch(err => {
    res.send(err);
  });
});
// update user - update dog within user & within dogs collection
app.put('/users/:id/dogs/update/:dogid', (req, res) => {
  let dogg = {};
  dogg.breed = req.body.breed;
  dogg._id = req.params.dogid;
  dogg.petName = req.body.petName;
  dogg.age = req.body.age;
  dogg.energy_level = req.body.energy_level;
  User.findOneAndUpdate({ _id: req.params.id, "dogs._id": req.params.dogid }, { $set: { "dogs.$" : dogg }}, { new: true })
  .then(user => {
    let dog = {};
    dog.breed = req.body.breed;
    dog._id = req.params.dogid;
    dog.petName = req.body.petName;
    dog.age = req.body.age;
    dog.energy_level = req.body.energy_level;
    Dog.findOneAndUpdate({ _id: req.params.dogid }, dog, { new: true })
    .then(dog => {
      res.json(dog);
    });
  })
  .catch(err => {
    res.send(err);
  });
});
// update user - delete dog within user & within dogs collection
app.delete('/users/:id/dogs/delete/:dogid', (req, res) => {
  User.findOneAndUpdate({ _id: req.params.id }, { $pull: { dogs: { _id: req.params.dogid } } })
  .then(user => {
    Dog.findOneAndDelete({ _id: req.params.dogid })
    .then(dog => {
      res.json(dog);
    })
  })
  .catch(err => {
    res.send(err);
  });
});
// delete user
app.delete('/users/delete/:id', (req, res) => {
  User.findOneAndDelete({ _id: req.params.id })
  .then(user => {
    res.json(user);
  });
});

app.set("port", process.env.PORT || 8080);

app.listen(app.get("port"), () => {
  console.log(`PORT: ${app.get("port")}`);
});

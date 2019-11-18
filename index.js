const app = require('express')();
var cors = require('cors');
const parser = require('body-parser');
const DogBreed = require('./db/models/DogBreed');

app.use(cors());
app.use(parser.json());

app.get('/', (req, res) => {
  DogBreed.find({}).then(dogBreeds => {
    res.json(dogBreeds);
  });
});

app.set("port", process.env.PORT || 8080);

app.listen(app.get("port"), () => {
  console.log(`PORT: ${app.get("port")}`);
});
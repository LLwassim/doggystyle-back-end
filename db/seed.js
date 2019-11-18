const fetch = require("node-fetch");
const DogBreed = require('./models/DogBreed');

const url = 'https://api.thedogapi.com/v1/breeds';
const api_key = '22ea4027-cfc1-464e-89c4-aed63db671ad';

DogBreed.remove({}).then(() => {
  fetch(url, {
    headers: {
        'X-Api-Key': api_key       
    }
  })
    .then(res => res.json())
    .then(res => {
      console.log(res);
      DogBreed.create(res).then(dogBreeds => {
        console.log(dogBreeds);
        process.exit();
      });
    })
    .catch(err => console.log('error', err))
});
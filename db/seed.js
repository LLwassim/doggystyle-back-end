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

      // console.log(res);

      for (let i = 0; i < res.length; i++) {
        let temperamentArray;
        if (!res[i].temperament) {
          if (res[i].name = 'Poodle (Toy)') {
            temperamentArray = ['Lively, Playful, Intelligent, Fun-loving, Athletic'];
          } else if (res[i].name = 'Poodle (Miniature)') {
            temperamentArray = ['Active', 'Intelligent', 'Proud'];
          } else if (res[i].name = 'Russian (Toy)') {
            temperamentArray = ['Active', 'Intelligent', 'Cheerful'];
          } else {
            temperamentArray = ['Loyal', 'Intelligent', 'Gentle'];
          }
        } else {
          temperamentArray = res[i].temperament.split(', ');
        }
        res[i].temperament = temperamentArray;
      }

      // console.log(res);
      
      for (let i = 0; i < res.length; i++) {
        res[i].compatibleWith = [];
        let splicedRes = res.slice(0);
        splicedRes.splice(i, 1);
        for (let j = 0; j < splicedRes.length; j++) {
          let count = 0;
          for (let k = 0; k < splicedRes[j].temperament.length; k++) {
            if (res[i].temperament.includes(splicedRes[j].temperament[k])) {
              count++;
            }
          }
          res[i].compatibleWith.push(count + ' . ' + splicedRes[j].name);
        }
      }

      // console.log(res);

      for (let i = 0; i < res.length; i++) {
        let newCompat = [];
        let max = 0;
        for (let j = 0; j < res[i].compatibleWith.length; j++) {
          let cwa = res[i].compatibleWith[j].split(' . ');
          cwa[0] = parseInt(cwa[0]);
          if (cwa[0] > max) {
            max = cwa[0];
            newCompat.push(cwa[1]);
          }
        }
        res[i].compatibleWith = newCompat;
        while (res[i].compatibleWith.length > 3) {
          res[i].compatibleWith.shift();
        }
      }
      
      // console.log(res);

      DogBreed.create(res).then(dogBreeds => {
        console.log(dogBreeds);
        process.exit();
      });
    })
    .catch(err => console.log('error', err))
});
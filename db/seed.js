const data = require('./data.json')
const breeds = require('../models/breeds')
const breedsData = data.map(item => {
    const breeds = {}
    breeds.weight = item.weight
    breeds.height = item.height
    breeds.breed_group = item.breed_group
    breeds.life_span = item.life_span
    breeds.temperement = item.temperement
    breeds.origin = item.origin
    return breeds
})
console.log(breedsData)

breeds.deleteMany({})
    .then(() => {
        breeds.create(breedsData)
            .then(breeds => {
                console.log(breedsData),
                process.exit()
            })
            .catch(err => {
                console.log(err),
                process.exit()
            })
    })
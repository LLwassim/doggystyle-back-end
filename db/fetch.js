const fetch = require('node-fetch')
const fs = require('fs')
const url = "https://api.thedogapi.com/v1/breeds"
fetch(url, {
    headers: {
        "X-Api-Key": "22ea4027-cfc1-464e-89c4-aed63db671ad"       
    }
})
    .then(res => res.json())
    .then(res => {
        console.log(res)
        //checking what the api response is
        let breeds = JSON.stringify(res)
        //turn breeds into string form
        fs.writeFile('./db/data.json', breeds, err => {
            if (err) {
                console.log(err)
            }
            else {
                console.log("success")
            }
        })
    })
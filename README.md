# doggystyle-back-end

This repo was created to hold the database connection, seed files, schemas, and API routes for a team project at General Assembly. You can access the full project here: [https://practical-roentgen-4bb960.netlify.com/](https://practical-roentgen-4bb960.netlify.com/)

## Approach Taken

1. Think about required models and create schemas
2. Connect to local MongoDB database and test connection
3. Seed "DogBreed" collection so we have access to all breeds for further manipulation
4. Create appropriate CRUD routes for each collection (DogBreed, Dog, User)
5. Test API routes
6. Update DogBreed schema and seed file to include **algorithm** that matches each breed with other breeds that have the most similar temperament and store those similar breeds in a **"compatibleWith" array** inside of each DogBreed object

## Routes/Features

  * Retrieve a list of all breeds: GET https://doggystyle-api.herokuapp.com/breeds
  * Retrieve a list of breeds by name search: GET https://doggystyle-api.herokuapp.com/breeds/breed/poodle <--- will retrieve all poodle breeds
  * Retrieve a list of breeds by temperament search: GET https://doggystyle-api.herokuapp.com/breeds/temperament/happy <--- will retrieve all happy temperament breeds
  * Retrieve a list of all dogs: GET https://doggystyle-api.herokuapp.com/dogs
  * Create a user (must choose a username that's not already taken): POST https://doggystyle-api.herokuapp.com/users/create
    * example request body (JSON):
      ```
      {
        "email": "example@example.com",
        "username": "yourUsername",
        "password": "yourPassword",
        "firstName": "yourFirstName",
        "lastName": "yourLastName"
      }
      ```
  * Retrieve a user by username and password: GET https://doggystyle-api.herokuapp.com/users/test/test <--- like "...com/users/username/password"
  * Retrieve a user by their dog's id (for setting up a dog-playdate): GET https://doggystyle-api.herokuapp.com/users/5dd5aa86961c250017b8d2be <--- like "...com/users/dogID"
  * Update a user's information: PUT https://doggystyle-api.herokuapp.com/users/update/5dd5a581961c250017b8d2bd <--- like "...com/users/update/userID"
    * example request body (JSON):
      ```
      {
        "email": "new.email@example.com"
      }
      ```
  * Create a dog in the user's dog array and the dog collection: POST https://doggystyle-api.herokuapp.com/users/5dd5a581961c250017b8d2bd/dogs/create <--- like "...com/users/userID/dogs/create"
    * example request body (JSON):
      ```
      {
        "petName": "Your New Dog's Name",
        "age": 1,
        "energy_level": 1,
        "breed": [
          {
            "id" : 18,
            "name" : "Anatolian Shepherd Dog",
            "temperament" : "Steady, Bold, Independent, Confident, Intelligent, Proud"
          }
        ]
      }
      ```
  * Update a dog in the user's dog array and the dog collection: PUT https://doggystyle-api.herokuapp.com/users/5dd5a581961c250017b8d2bd/dogs/update/5dd5aa86961c250017b8d2be <--- like "...com/users/userID/dogs/update/dogID"
    * example request body (JSON):
      ```
      {
        "petName": "Your Updated Dog's Name",
        "age": 2,
        "energy_level": 1,
        "breed": [
          {
            "id" : 18,
            "name" : "Anatolian Shepherd Dog",
            "temperament" : "Steady, Bold, Independent, Confident, Intelligent, Proud"
          }
        ]
      }
      ```
  * Delete a dog in the user's dog array and the dog collection: DELETE https://doggystyle-api.herokuapp.com/users/5dd5a581961c250017b8d2bd/dogs/delete/5dd5aa86961c250017b8d2be <--- like "...com/users/userID/dogs/delete/dogID"
  * Delete a user: DELETE https://doggystyle-api.herokuapp.com/users/delete/5dd5a581961c250017b8d2bd <--- like "...com/users/delete/userID"

## Technologies Used

  - Node
     - An open source environment that allows you to run JavaScript on the server
  - Express
     - A Node.js web application framework that provides a robust set of features for web and mobile applications
  - MongoDB
     - A cross-platform document-oriented, non-relational database program
  - Mongoose
     - Elegant mongodb object modeling for Node.js. It provides a straight-forward, schema-based solution to model your application data and includes built-in type casting, validation, query building, business logic hooks and more, out of the box
  - Node-Fetch
     - A light-weight module that brings window.fetch to Node.js
  - Body-Parser
     - A Node.js body parsing middleware

## Problems

  * Not very secure 
    * Anyone could retrieve the list of dogs, retrieve each dog's owner by searching for user by dog ID, and then delete all users or access user emails

## Contribute

  * Source code: [https://github.com/LLwassim/doggystyle-back-end](https://github.com/LLwassim/doggystyle-back-end)
  * Issue Tracker: [https://github.com/LLwassim/doggystyle-back-end/issues](https://github.com/LLwassim/doggystyle-back-end/issues)
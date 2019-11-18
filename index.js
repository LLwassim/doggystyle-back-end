const express = require("express");
const parser = require("body-parser");
const cors = require("cors");
// const bookmarksController = require("./controllers/bookmarks");
// const usersController = require("./controllers/users");

// instantiate express
const app = express();

// Middleware configuration

// interprets key value pairs in URLs
app.use(parser.urlencoded({ extended: true }));

// converts a json string to the an object and attaches it to req.body
app.use(parser.json());

// cors allows connections from all domains
app.use(cors());

// redirect any requests to the homepage to bookmarks
app.get("/", (req, res) => {
  res.redirect("/api/Home");
});

// hands off requests on the '/api/bookmarks' route to the bookmarks controller
app.use("/api/Home/", );
// hands off requests on the '/api/users' route to the users controller
app.use("/api/users/", usersController);

app.set("port", process.env.PORT || 8080);

app.listen(app.get("port"), () => {
  console.log(`✅ PORT: ${app.get("port")} 🌟`);
});
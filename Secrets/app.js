require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
var md5 = require("md5");

const app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// database
mongoose.connect("mongodb://localhost:27017/userDB", { useNewUrlParser: true });

const userSchema = mongoose.Schema({
  email: String,
  password: String,
});

const User = new mongoose.model("User", userSchema);

// routes
app.get("/", function (req, res) {
  res.render("home");
});

app.get("/login", function (req, res) {
  res.render("login");
});

app.get("/register", function (req, res) {
  res.render("register");
});

app.post("/register", async function (req, res) {
  const newUser = new User({
    email: req.body.username,
    // save hashed password in database, while registration
    password: md5(req.body.password),
  });

  const result = await newUser.save();
  res.render("secrets");
});

app.post("/login", async function (req, res) {
  const username = req.body.username;
  // Use same hash function for authentication, while login
  const password = md5(req.body.password);

  const user = await User.findOne({ email: username });

  if (user) {
    if (user.password === password) {
      res.render("secrets");
    } else {
      console.log("Incorrect password");
      res.render("login");
    }
  } else {
    console.log("User does not exist");
    res.render("login");
  }
});

app.listen(3000, function () {
  console.log("Server Started on port- 3000.");
});

// API endpoint

const express = require("express")
const mongoose = require('mongoose');

const app = express()
const port = process.env.port || 3004


// Middleware
app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// sample data
const recipes = [
  {
    title: "Jollof Rice",
    description: "A popular West African dish",
    image: "images/jollof.jpeg"
  },
  {
    title: "Fried Rice",
    description: "Simple brunch meal",
    image: "images/friedrice.webp"
  },
  {
    title: "Noodles",
    description: "Simple brunch meal",
    image: "images/noodles.jpg"
  },
  {
    title: "Pancake",
    description: "Simple breakfast meal",
    image: "images/pancake.jpg"
  },
  {
    title: "Fufu",
    description: "A Ghanaian Dish",
    image: "images/fufu.jpg"
  },
  {
    title: "Beans",
    description: "A Ghanaian Dish",
    image: "images/beans.jpg"
  }
];


app.get("/recipes", (req, res) => {
  res.json(recipes);
});


mongoose.connect('mongodb://127.0.0.1:27017/myprojectDB')
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));



const ProjectSchema = new mongoose.Schema({
title: String,
image: String,
link: String,
description: String,
});

const Project = mongoose.model('Project', ProjectSchema);

const UserSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  email: String,
  password: String,
  confpassword: String
});

const User = mongoose.model("User", UserSchema);

// 3. REST API route
app.get('/api/projects', async (req, res) => {
const projects = await Project.find({});
res.json({ statusCode: 200, data: projects, message: 'Success' });
});

app.post("/signup", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.json({ message: "User saved!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.listen(port, () => {
console.log(`App listening on port ${port}`);
});




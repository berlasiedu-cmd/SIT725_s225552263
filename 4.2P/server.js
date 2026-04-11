/* const express = require('express');
const app = express();



app.use(express.json()) */;

var express = require("express");
var app = express();
const PORT = 3000;
app.use(express.static('client'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const mongoose = require('mongoose');


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

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/myprojectDB')
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));

// Schema
const UserSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: String,
  password: String,
  confpassword: String
});

const User = mongoose.model('User', UserSchema);



// API endpoint
app.get('/api/recipes', (req, res) => {
  res.json(recipes);
});



app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


 app.post('/signup', async (req, res) => {
  console.log("DATA RECEIVED:", req.body); 

  try {
    const user = new User(req.body);
    await user.save();

    console.log("User saved to DB"); 

    res.json({ message: "User saved!" });
  } catch (err) {
    console.log("ERROR:", err);
    res.status(500).json({ error: err.message });
  }
}); 



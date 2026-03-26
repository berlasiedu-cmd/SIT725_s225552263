const express = require('express');
const app = express();
const PORT = 3000;

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

// API endpoint
app.get('/api/recipes', (req, res) => {
  res.json(recipes);
});

// serve frontend
app.use(express.static('client'));

// START SERVER (THIS IS VERY IMPORTANT)
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
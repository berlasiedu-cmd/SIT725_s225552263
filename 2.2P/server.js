const express = require('express');
const app = express();
const port = 3000;

// Serve static files from 'public' folder
app.use(express.static('public'));

// Example GET endpoint
app.get('/hello', (req, res) => {
  res.send('Hello World!');
});

// Endpoint to add two numbers
app.get('/add', (req, res) => {
  const num1 = parseFloat(req.query.num1);
  const num2 = parseFloat(req.query.num2);

  if (isNaN(num1) || isNaN(num2)) {
    return res.status(400).send('Invalid numbers');
  }

  res.send(`Result: ${num1 + num2}`);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
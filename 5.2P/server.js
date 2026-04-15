const express = require('express');
const app = express();
const PORT = 3000;

// Import route file
const bookRoutes = require('./routes/books.routes');
const { getAllBook } = require('./services/books.service');

app.use(express.static('public'));
// Mount the route at /api/book
app.use('/api/books', bookRoutes);

// Root route
/*app.get('/', (req, res) => {
  res.send('Welcome to the Books Catalog Home Page!');

});*/

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});


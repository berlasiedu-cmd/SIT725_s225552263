
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const app = express();
const PORT = 3000;

// 1. Connect to MongoDB
// mongoose.connect('mongodb://localhost:27017/bookDB', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   });
  
  mongoose.connect('mongodb://127.0.0.1:27017/bookDB');

  mongoose.connection.on('connected', () => {
    console.log('✅ Connected to MongoDB');
  });
  
// 2) App + middleware
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  // 3) Routes (MVC). 
const bookRoutes = require('./routes/books.routes');

app.use('/api/books', bookRoutes);
// Optional: integrity check
app.get('/api/integrity-check42', (_req, res) => res.sendStatus(204));

// 4) Root
//app.get('/', (_req, res) => res.send('Welcome to the Book Menu Home Page!'));

// 5) 404 + error handlers
app.use((req, res) => res.status(404).json({ message: 'Not found' }));
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ message: 'Server error' });
});

// 6) Start
console.log('[BOOT] about to listen');
app.listen(PORT, () => console.log(`Server is running at http://localhost:${PORT}`));






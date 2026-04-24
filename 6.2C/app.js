const express = require('express');
const app = express();

const mathRoutes = require('./routes/mathRoutes');

app.use(express.json());
app.use('/api', mathRoutes);

app.get('/', (req, res) => {
    res.send('API is running');
});

module.exports = app;
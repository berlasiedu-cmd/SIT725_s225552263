const express = require('express');
const router = express.Router();

// Import all controllers via index.js
const Controllers = require('../controllers/');

router.get('/', Controllers.bookController.getAllBook);

router.get('/:id', Controllers.bookController.getBookById);

module.exports = router;
const express = require('express');
const router = express.Router();

// Import the controller directly
const bookController = require('../controllers/bookController');

router.get('/', bookController.getAllBooks);
router.get('/:id', bookController.getBookById);

router.post('/', bookController.createBook);
router.put('/:id', bookController.updateBook);

module.exports = router;
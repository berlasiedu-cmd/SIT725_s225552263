const bookService = require('../services/books.service');

function extractValidationMessages(err) {
  return Object.values(err.errors).map(e => e.message).join('; ');
}

// Get all books
exports.getAllBooks = async (req, res) => {
  try {
    const items = await bookService.getAllBooks();
    res.json({
      statusCode: 200,
      data: items,
      message: 'Books retrieved successfully',
      developedBy: 's225552263' 
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ statusCode: 500, message: 'Server error' });
  }
};

// Get book by ID
exports.getBookById = async (req, res) => {
  try {
    const book = await bookService.getBookById(req.params.id);
 
    if (!book) {
      return res.status(404).json({
        statusCode: 404,
        message: 'Book not found'
      });
    }
 
    res.json({
      statusCode: 200,
      data: book,
      message: 'Book retrieved using service successfully'
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ statusCode: 500, message: 'Server error' });
  }
};

// POST /api/books
exports.createBook = async (req, res) => {
  try {
    const book = await bookService.createBook(req.body);
    res.status(201).json({ statusCode: 201, data: book, message: 'Book created successfully' });
  } catch (err) {
    if (err.code === 'UNKNOWN_FIELDS' || err.code === 'VALIDATION') {
      return res.status(400).json({ statusCode: 400, message: err.message });
    }
    if (err.name === 'ValidationError') {
      return res.status(400).json({ statusCode: 400, message: extractValidationMessages(err) });
    }
    // Duplicate key (unique id constraint)
    if (err.code === 11000) {
      return res.status(409).json({ statusCode: 409, message: 'A book with that id already exists' });
    }
    console.error(err);
    res.status(500).json({ statusCode: 500, message: 'Server error' });
  }
};
 
// PUT /api/books/:id
exports.updateBook = async (req, res) => {
  try {
    const book = await bookService.updateBook(req.params.id, req.body);
    if (!book) return res.status(404).json({ statusCode: 404, message: 'Book not found' });
    res.json({ statusCode: 200, data: book, message: 'Book updated successfully' });
  } catch (err) {
    if (err.code === 'IMMUTABLE' || err.code === 'UNKNOWN_FIELDS' || err.code === 'VALIDATION') {
      return res.status(400).json({ statusCode: 400, message: err.message });
    }
    if (err.name === 'ValidationError') {
      return res.status(400).json({ statusCode: 400, message: extractValidationMessages(err) });
    }
    console.error(err);
    res.status(500).json({ statusCode: 500, message: 'Server error' });
  }
};
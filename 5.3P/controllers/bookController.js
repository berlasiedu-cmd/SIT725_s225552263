const bookService = require('../services/books.service');

// Get all books
exports.getAllBook = async (req, res) => {
  try {
    const items = await bookService.getAllBook();
    res.json({
      statusCode: 200,
      data: items,
      message: 'Books retrieved successfully'
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
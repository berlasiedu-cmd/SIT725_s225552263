const bookService = require('../services/books.service');

// Get all books
exports.getAllBook = (req, res) => {
  const items = bookService.getAllBook();
  res.json({
    status: 200,
    data: items,
    message: 'Book menu retrieved using service'
  });
};

// Get book by ID
exports.getBookById = (req, res) => {
  const id = req.params.id;

  const book = bookService.getBookById(id);

  if (!book) {
    return res.status(404).json({
      status: 404,
      message: "Book not found"
    });
  }

  res.json({
    status: 200,
    data: book
  });
};
const books = require('../models/bookModel');

// Get all books from MongoDB
const getAllBook = async () => {
  return await books.find({});
};
 
const getBookById = async (id) => {
  return await books.findById(id);
};
module.exports = {
  getAllBook,
  getBookById
};

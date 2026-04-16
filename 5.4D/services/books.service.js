const books = require('../models/bookModel');

const ALLOWED_FIELDS = ['id', 'title', 'author', 'year', 'genre', 'summary', 'price'];
const UPDATE_FIELDS  = ['title', 'author', 'year', 'genre', 'summary', 'price'];
 
// Get all books from MongoDB
const getAllBook = async () => {
  return await books.find({});
};
 
const getBookById = async (id) => {
  if (mongoose.Types.ObjectId.isValid(id)) {
    return await books.findById(id);
  }
  return await books.findOne({ id });
};

const checkUnknownFields = (body, allowed) => {
  const unknown = Object.keys(body).filter(k => !allowed.includes(k));
  return unknown.length ? unknown : null;
};
 
const createBook = async (body) => {
  // Reject unknown fields
  const unknown = checkUnknownFields(body, ALLOWED_FIELDS);
  if (unknown) {
    const err = new Error(`Unknown fields not allowed: ${unknown.join(', ')}`);
    err.code = 'UNKNOWN_FIELDS';
    throw err;
  }
 
  // Convert price string -> Decimal128
  if (body.price !== undefined) {
    const n = parseFloat(body.price);
    if (isNaN(n)) {
      const err = new Error('price must be a valid number');
      err.code = 'VALIDATION';
      throw err;
    }
    body.price = require('mongoose').Types.Decimal128.fromString(String(n.toFixed(2)));
  }
 
  const book = new Book(body);
  return await book.save();
};
 
const updateBook = async (mongoId, body) => {
  // id field must not be in update body (immutable)
  if ('id' in body) {
    const err = new Error('id is immutable and cannot be changed');
    err.code = 'IMMUTABLE';
    throw err;
  }
 
  // Reject unknown fields
  const unknown = checkUnknownFields(body, UPDATE_FIELDS);
  if (unknown) {
    const err = new Error(`Unknown fields not allowed: ${unknown.join(', ')}`);
    err.code = 'UNKNOWN_FIELDS';
    throw err;
  }
 
  // Convert price string -> Decimal128
  if (body.price !== undefined) {
    const n = parseFloat(body.price);
    if (isNaN(n)) {
      const err = new Error('price must be a valid number');
      err.code = 'VALIDATION';
      throw err;
    }
    body.price = require('mongoose').Types.Decimal128.fromString(String(n.toFixed(2)));
  }
 
  const book = await Book.findById(mongoId);
  if (!book) return null;
 
  Object.assign(book, body);
  return await book.save(); // triggers schema validators
};
  
module.exports = {
  getAllBook,
  getBookById,
  createBook, 
  updateBook
};

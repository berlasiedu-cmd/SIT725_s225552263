const mongoose = require('mongoose');
  // 2. Define your schema and model

const BookSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true, index: true, trim: true,
    match: [/^[a-zA-Z0-9_-]{1,20}$/, 'id must be 1-20 alphanumeric characters (hyphens/underscores allowed)'] },
  
  title: { type: String, required: [true, 'title is required'],
    trim: true,
    minlength: [5, 'title must be at least 5 characters'],
    maxlength: [150, 'title must be at most 150 characters'] },
  
  author: { type: String, required: [true, 'author is required'],
    trim: true,
    minlength: [2, 'author must be at least 2 characters'],
    maxlength: [100, 'author must be at most 100 characters']},

  year: { type: Number, required: [true, 'year is required'],
    min: [1000, 'year must be 1000 or later'],
    max: [new Date().getFullYear(), 'year cannot be in the future'],
    validate: {
      validator: Number.isInteger,
      message: 'year must be an integer'
    } },

  genre: { type: String, required: [true, 'genre is required'],
    trim: true,
    minlength: [2, 'genre must be at least 2 characters'],
    maxlength: [50, 'genre must be at most 50 characters'] },

  summary: { type: String, required: [true, 'summary is required'],
    trim: true,
    minlength: [20, 'summary must be at least 20 characters'],
    maxlength: [1000, 'summary must be at most 1000 characters'] },

  price: { type: mongoose.Schema.Types.Decimal128,
    required: [true, 'price is required'],
    validate: {
      validator: function (v) {
        const n = parseFloat(v.toString());
        return n >= 0 && n <= 9999.99;
      },
      message: 'price must be between 0.0 and 9999.99'
    }},   // store "12.50"

  currency: { type: String, required: true, default: 'AUD',enum: { values: ['AUD'], message: 'currency must be AUD' } }
}, {
  toJSON:   { getters: true, virtuals: false, transform(_doc, ret){ delete ret.__v; return ret; } },
  toObject: { getters: true, virtuals: false }
});
module.exports = mongoose.model('Book', BookSchema);



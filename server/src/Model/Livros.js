const mongoose = require('mongoose');

const { Schema } = mongoose;

const LivrosSchema = new Schema({
  title: {
    type: String,
    trim: true,
    required: [true, 'Por favor coloque o titulo'],
    maxlength: 30,
  },
  description: {
    type: String,
    trim: true,
    required: [true, 'Por favor coloque a descrição'],
  },
  pageCount: {
    type: Number,
    trim: true,
    required: [true, 'Por favor coloque a quantidade de páginas'],
  },
  excerpt: {
    type: String,
    trim: true,
    required: [true],
  },
  publishDate: {
    type: date,
    trim: true,
    required: [true],
  },
});

module.exports = mongoose.model('Livros', LivrosSchema);

import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  username: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1, max: 5
  },
  comment: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const bookSchema = new mongoose.Schema({
  title: {
    type: String, required: true, trim: true
  },
  author: {
    type: String, required: true, trim: true
  },
  description: {
    type: String, trim: true
  },
  publishedYear: {
    type: Number
  },
  genre: {
    type: [String], default: []
  },
  isbn: {
    type: String, trim: true
  },
  reviews: [reviewSchema],
  createdAt: {
    type: Date, default: Date.now
  }
});

export default mongoose.model('Book', bookSchema);
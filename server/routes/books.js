import express from 'express';
import Book from '../models/Book.js';

const router = express.Router();


// this file i have given the api endpoints - used the try catch to avoid any server crash
router.get('/', async (req, res) => {
  try 
  {
    const books = await Book.find();
    res.json(books);
  } 
  catch (err) 
  {
    res.status(500).json({ message: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try 
  {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'book not found' });
    res.json(book);
  } 
  catch (err) 
  {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', async (req, res) => {
  const book = new Book(req.body);
  try 
  {
    const newBook = await book.save();
    res.status(201).json(newBook);
  } 
  catch (err) 
  {
    res.status(400).json({ message: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id, 
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedBook) return res.status(404).json({ message: 'book not found' });
    res.json(updatedBook);
  } 
  catch (err) 
  {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try 
  {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) return res.status(404).json({ message: 'book not found' });
    res.json({ message: 'book deleted' });
  } 
  catch (err) 
  {
    res.status(500).json({ message: err.message });
  }
});

router.post('/:id/reviews', async (req, res) => {
  try {
    const { userId, username, rating, comment } = req.body;
    
    if (!userId || !username || !rating || !comment) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    
    book.reviews.push({
      user: userId,
      username,
      rating,
      comment
    });
    
    await book.save();
    res.status(201).json(book);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get('/:id/reviews', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    
    res.json(book.reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
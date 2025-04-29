import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBook, FaUser, FaInfoCircle, FaCalendar, FaTags, FaBarcode } from 'react-icons/fa';
import api from '../services/api';

const AddBook = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    description: '',
    publishedYear: '',
    genre: '',
    isbn: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const bookData = {
        ...formData,
        publishedYear: formData.publishedYear ? parseInt(formData.publishedYear) : undefined,
        genre: formData.genre ? formData.genre.split(',').map(g => g.trim()) : []
      };
      
      await api.createBook(bookData);
      navigate('/books');
    } catch (err) {
      setError('Failed to add book. Please check your information and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-book-container">
      <form onSubmit={handleSubmit} className="book-form">
        <h1>Add New Book</h1>
        
        {error && (
          <div className="error-message">
            <FaInfoCircle /> {error}
          </div>
        )}
        
        <div className="form-group">
          <label htmlFor="title">
            <FaBook className="form-icon" /> Book Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter the book title"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="author">
            <FaUser className="form-icon" /> Author
          </label>
          <input
            type="text"
            id="author"
            name="author"
            value={formData.author}
            onChange={handleChange}
            placeholder="Enter the author's name"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="description">
            <FaInfoCircle className="form-icon" /> Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter a brief description of the book"
            rows="4"
          />
        </div>
        
        <div className="two-columns">
          <div className="form-group">
            <label htmlFor="publishedYear">
              <FaCalendar className="form-icon" /> Published Year
            </label>
            <input
              type="number"
              id="publishedYear"
              name="publishedYear"
              value={formData.publishedYear}
              onChange={handleChange}
              placeholder="e.g., 2023"
              min="1000"
              max="2100"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="isbn">
              <FaBarcode className="form-icon" /> ISBN
            </label>
            <input
              type="text"
              id="isbn"
              name="isbn"
              value={formData.isbn}
              onChange={handleChange}
              placeholder="ISBN number (optional)"
            />
          </div>
        </div>
        
        <div className="form-group">
          <label htmlFor="genre">
            <FaTags className="form-icon" /> Genres
          </label>
          <input
            type="text"
            id="genre"
            name="genre"
            value={formData.genre}
            onChange={handleChange}
            placeholder="Enter genres separated by commas (e.g., Fiction, Fantasy, Adventure)"
          />
          <small className="form-help">Separate multiple genres with commas</small>
        </div>
        
        <button 
          type="submit" 
          disabled={loading}
          className={loading ? 'btn-loading' : ''}
        >
          {loading ? 'Adding Book...' : 'Add Book'}
        </button>
      </form>
    </div>
  );
};

export default AddBook;
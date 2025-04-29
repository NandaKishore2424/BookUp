import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';

const EditBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    description: '',
    publishedYear: '',
    genre: '',
    isbn: ''
  });

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const book = await api.getBook(id);
        setFormData({
          title: book.title || '',
          author: book.author || '',
          description: book.description || '',
          publishedYear: book.publishedYear || '',
          genre: book.genre && book.genre.length ? book.genre.join(', ') : '',
          isbn: book.isbn || ''
        });
      } catch (err) {
        setError('Failed to load book data');
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    
    try {
      const bookData = {
        ...formData,
        publishedYear: formData.publishedYear ? parseInt(formData.publishedYear) : undefined,
        genre: formData.genre ? formData.genre.split(',').map(g => g.trim()) : []
      };
      
      await api.updateBook(id, bookData);
      navigate(`/books/${id}`);
    } catch (err) {
      setError('Failed to update book');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Edit Book</h1>
      
      {error && <div className="error">{error}</div>}
      
      <form onSubmit={handleSubmit} className="book-form">
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="author">Author</label>
          <input
            type="text"
            id="author"
            name="author"
            value={formData.author}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="publishedYear">Published Year</label>
          <input
            type="number"
            id="publishedYear"
            name="publishedYear"
            value={formData.publishedYear}
            onChange={handleChange}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="genre">Genres (comma-separated)</label>
          <input
            type="text"
            id="genre"
            name="genre"
            value={formData.genre}
            onChange={handleChange}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="isbn">ISBN</label>
          <input
            type="text"
            id="isbn"
            name="isbn"
            value={formData.isbn}
            onChange={handleChange}
          />
        </div>
        
        <button type="submit" disabled={saving}>
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
};

export default EditBook;
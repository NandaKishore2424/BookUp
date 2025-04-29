import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user, isAuthor } = useContext(AuthContext);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data = await api.getAllBooks();
        setBooks(data);
      } catch (err) {
        setError('Failed to fetch books');
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this book?');

    if(!confirmDelete) return;

    try {
      await api.deleteBook(id);
      setBooks(prevBooks => prevBooks.filter(book => book._id !== id));
    } catch (err) {
      setError('Failed to delete book');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="book-list">
      <h1>Book List</h1>

      {books.length === 0 ? (
        <p>No books found. Add some books!</p>
      ) : (
        <div className="books-container">
          {books.map(book => (
            <div className="book-card" key={book._id}>
              <h2>{book.title}</h2>
              <p><strong>Author:</strong> {book.author}</p>
              <p><strong>Published:</strong> {book.publishedYear}</p>

              <div className="book-actions">
                <Link to={`/books/${book._id}`} className="btn btn-view">View</Link>
                
                {user && isAuthor() && (
                  <>
                    <Link to={`/books/edit/${book._id}`} className="btn btn-edit">Edit</Link>
                    <button
                      onClick={() => handleDelete(book._id)}
                      className="btn btn-delete"
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookList;

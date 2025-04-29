import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';

const BookDetails = () => {
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(5);
  const { id } = useParams();
  const { user, isAuthor } = useContext(AuthContext);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const data = await api.getBook(id);
        setBook(data);
      } catch (err) {
        setError('Failed to fetch book details');
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert('You must be logged in to leave a review');
      return;
    }

    try {
      const reviewData = {
        userId: user.id,
        username: user.username,
        rating: parseInt(rating),
        comment: reviewText
      };
      
      const updatedBook = await api.addReview(id, reviewData);
      setBook(updatedBook);
      setReviewText('');
      setRating(5);
    } catch (err) {
      setError('Failed to add review');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!book) return <div className="error">Book not found</div>;

  return (
    <div className="book-details">
      <h1>{book.title}</h1>
      <div className="book-info">
        <p><strong>Author:</strong> {book.author}</p>
        <p><strong>Published Year:</strong> {book.publishedYear}</p>
        {book.isbn && <p><strong>ISBN:</strong> {book.isbn}</p>}
        {book.genre && book.genre.length > 0 && (
          <div>
            <strong>Genres:</strong>
            <ul className="genre-list">
              {book.genre.map((g, index) => (
                <li key={index}>{g}</li>
              ))}
            </ul>
          </div>
        )}
        {book.description && (
          <div className="book-description">
            <h3>Description:</h3>
            <p>{book.description}</p>
          </div>
        )}
      </div>
      
      <div className="book-actions">
        {user && isAuthor() && (
          <Link to={`/books/edit/${book._id}`} className="btn btn-edit">Edit Book</Link>
        )}
        <Link to="/books" className="btn">Back to List</Link>
      </div>
      
      
      <div className="reviews-section">
        <h2>Reviews</h2>
        
        
        {user && !isAuthor() && (
          <div className="add-review">
            <h3>Add Your Review</h3>
            <form onSubmit={handleReviewSubmit}>
              <div className="form-group">
                <label>Rating:</label>
                <select 
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                  required
                >
                  <option value="5">5 - Excellent</option>
                  <option value="4">4 - Very Good</option>
                  <option value="3">3 - Good</option>
                  <option value="2">2 - Fair</option>
                  <option value="1">1 - Poor</option>
                </select>
              </div>
              <div className="form-group">
                <label>Your Review:</label>
                <textarea
                  rows="4"
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  required
                  placeholder="Share your thoughts about this book..."
                />
              </div>
              <button type="submit" className="btn btn-primary">Submit Review</button>
            </form>
          </div>
        )}
        
        <div className="reviews-list">
          {book.reviews && book.reviews.length > 0 ? (
            book.reviews.map((review, index) => (
              <div key={index} className="review-card">
                <div className="review-header">
                  <span className="review-author">{review.username}</span>
                  <span className="review-rating">
                    {"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}
                  </span>
                  <span className="review-date">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="review-comment">{review.comment}</p>
              </div>
            ))
          ) : (
            <p>No reviews yet. Be the first to review!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookDetails;

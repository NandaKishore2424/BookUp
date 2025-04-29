import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/books';

const api = {
  getAllBooks: async () => {
    try {
      const res = await axios.get(BASE_URL);
      return res.data;
    } catch (err) {
      console.error('failed to fetch books:', err);
      throw err;
    }
  },
  getBook: async (id) => {
    try {
      const res = await axios.get(`${BASE_URL}/${id}`);
      return res.data;
    } catch (err) {
      console.error(`failed to fetch book with ID ${id}:`, err);
      throw err;
    }
  },

  createBook: async (data) => {
    try {
      const res = await axios.post(BASE_URL, data);
      return res.data;
    } catch (err) {
      console.error('failed to create book:', err);
      throw err;
    }
  },

  updateBook: async (id, data) => {
    try {
      const res = await axios.put(`${BASE_URL}/${id}`, data);
      return res.data;
    } catch (err) {
      console.error(`failed to update book with ID ${id}:`, err);
      throw err;
    }
  },

  deleteBook: async (id) => {
    try {
      const res = await axios.delete(`${BASE_URL}/${id}`);
      return res.data;
    } catch (err) {
      console.error(`failed to delete book with ID ${id}:`, err);
      throw err;
    }
  },

  addReview: async (bookId, reviewData) => {
    try {
      const res = await axios.post(`${BASE_URL}/${bookId}/reviews`, reviewData);
      return res.data;
    } catch (err) {
      console.error(`Failed to add review to book ${bookId}:`, err);
      throw err;
    }
  },

  getReviews: async (bookId) => {
    try {
      const res = await axios.get(`${BASE_URL}/${bookId}/reviews`);
      return res.data;
    } catch (err) {
      console.error(`Failed to fetch reviews for book ${bookId}:`, err);
      throw err;
    }
  }
};

export default api;

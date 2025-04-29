import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'reader'
  });
  const [error, setError] = useState('');
  const { signup } = useContext(AuthContext);
  const navigate = useNavigate();

  const { username, email, password, confirmPassword, role } = formData;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    const userData = {
      username,
      email,
      password,
      role
    };
    
    const success = await signup(userData);
    if (success) {
      if (role === 'author') {
        navigate('/books');
      } else {
        alert('Registration successful! Please login to continue.');
        navigate('/login');
      }
    } else {
      setError('Signup failed. Please try again.');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form-container">
        <h2>Create Account</h2>
        {error && <div className="error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={handleChange}
              placeholder="Choose a username"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleChange}
              placeholder="Enter your email address"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handleChange}
              placeholder="Create a password (min. 6 characters)"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="role">I am a:</label>
            <select
              id="role"
              name="role"
              value={role}
              onChange={handleChange}
            >
              <option value="reader">Reader</option>
              <option value="author">Author</option>
            </select>
          </div>
          
          <button type="submit" className="btn btn-primary">Create Account</button>
        </form>
        
        <div className="auth-link">
          Already have an account? <button className="link-button" onClick={() => navigate('/login')}>Login</button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
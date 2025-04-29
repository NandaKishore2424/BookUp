import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');
    
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      axios.defaults.headers.common['x-auth-token'] = storedToken;
    }
    
    setLoading(false);
  }, []);
  
  const login = async (email, password) => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      axios.defaults.headers.common['x-auth-token'] = res.data.token;
      setUser(res.data.user);
      return true;
    } catch (err) {
      console.error('Login failed:', err.response?.data || err.message);
      return false;
    }
  };
  
  const signup = async (userData) => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/signup', userData);
      
      if (userData.role === 'author') {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.user));
        axios.defaults.headers.common['x-auth-token'] = res.data.token;
        setUser(res.data.user);
      }
      
      return true;
    } catch (err) {
      console.error('Signup failed:', err.response?.data || err.message);
      return false;
    }
  };
  
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    delete axios.defaults.headers.common['x-auth-token'];
    setUser(null);
  };
  
  const isAuthor = () => {
    return user && user.role === 'author';
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout, isAuthor }}>
      {children}
    </AuthContext.Provider>
  );
};
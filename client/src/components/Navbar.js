import React, { useState, useContext, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { FaBook, FaPlus, FaUserCircle, FaBars, FaTimes, FaMoon, FaSun } from 'react-icons/fa';
import { IoLogOutOutline } from 'react-icons/io5';
import '../styles/Navbar.css'; 

const Navbar = () => {
  const { user, logout, isAuthor } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : false;
  });

  const isAuthPage = ['/login', '/signup'].includes(location.pathname);

  useEffect(() => {
    setIsOpen(false);
    setShowDropdown(false);
  }, [location.pathname]);

  useEffect(() => {
    if (darkMode && !isAuthPage) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode, isAuthPage, location.pathname]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/books" className="navbar-logo">
          <FaBook className="logo-icon" />
          <span>BookUp</span>
        </Link>
        
        <div className="menu-icon" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </div>
        
        <ul className={isOpen ? 'nav-menu active' : 'nav-menu'}>
          <li className="nav-item">
            <Link to="/books" className={`nav-link ${isActive('/books')}`}>
              Browse Books
            </Link>
          </li>
          
          {user && isAuthor() && (
            <li className="nav-item">
              <Link to="/books/add" className={`nav-link ${isActive('/books/add')}`}>
                <FaPlus className="nav-icon" />
                <span>Add Book</span>
              </Link>
            </li>
          )}
          
          {user && !isAuthPage && (
            <li className="nav-item">
              <button onClick={toggleDarkMode} className="nav-link reading-mode-toggle">
                {darkMode ? (
                  <>
                    <FaSun className="nav-icon" />
                    <span className="mode-text">Light Mode</span>
                  </>
                ) : (
                  <>
                    <FaMoon className="nav-icon" />
                    <span className="mode-text">Dark Mode</span>
                  </>
                )}
              </button>
            </li>
          )}
          
          {!user ? (
            <>
              <li className="nav-item">
                <Link to="/login" className={`nav-link auth-link ${isActive('/login')}`}>
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/signup" className={`nav-link auth-link signup ${isActive('/signup')}`}>
                  Sign Up
                </Link>
              </li>
            </>
          ) : (
            <li className="nav-item user-menu">
              <div 
                className="user-menu-button" 
                onClick={() => setShowDropdown(!showDropdown)}
              >
                <FaUserCircle className="user-icon" />
                <span>{user.username}</span>
              </div>
              
              {showDropdown && (
                <div className="dropdown-menu">
                  <button className="dropdown-item" onClick={handleLogout}>
                    <IoLogOutOutline className="dropdown-icon" />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};
export default Navbar;

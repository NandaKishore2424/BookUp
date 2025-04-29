import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import Navbar from './components/Navbar';
import BookList from './components/BookList';
import BookDetails from './components/BookDetails';
import AddBook from './components/AddBook';
import EditBook from './components/EditBook';
import Login from './components/Login';
import Signup from './components/Signup';
import { AuthContext, AuthProvider } from './context/AuthContext';
import './App.css';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  
  if (loading) return null;
  if (!user) {
    return <Navigate to="/login" />;
  }
  
  return children;
};

const AppLayout = () => {
  const location = useLocation();
  const authPages = ['/login', '/signup'];
  const hideNavbar = authPages.includes(location.pathname);
  
  return (
    <>
      {!hideNavbar && <Navbar />}
      <main className={hideNavbar ? "full-height" : "container"}>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/books" element={
            <ProtectedRoute>
              <BookList />
            </ProtectedRoute>
          } />
          <Route path="/books/:id" element={
            <ProtectedRoute>
              <BookDetails />
            </ProtectedRoute>
          } />
          <Route path="/books/add" element={
            <ProtectedRoute>
              <AddBook />
            </ProtectedRoute>
          } />
          <Route path="/books/edit/:id" element={
            <ProtectedRoute>
              <EditBook />
            </ProtectedRoute>
          } />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </main>
    </>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <AppLayout />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;

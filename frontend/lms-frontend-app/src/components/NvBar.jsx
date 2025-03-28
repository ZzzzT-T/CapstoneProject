import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext';
import './Layout.css';

const Nvbar = () => {
  const { userRole } = useAuth();

  console.log('Navbar - User Role:', userRole);

  return (
    <nav className="navbar">
      <ul>
        {userRole === 'LIBRARIAN' ? (
          <>
            <li><Link to="/home">Home</Link></li>
            <li><Link to="/bookmanagement">Book Management</Link></li>
            <li><Link to="/usermanagement">User Management</Link></li>
            <li><Link to="/borrow">View Books</Link></li>
            <li><Link to="/borrowdetails">My Borrowed Books</Link></li>
            <li><Link to="/logout">Logout</Link></li>
          </>
        ) : userRole === 'MEMBER' ? (
          <>
            <li><Link to="/home">Home</Link></li>
            <li><Link to="/borrow">View Books</Link></li>
            <li><Link to="/borrowdetails">My Borrowed Books</Link></li>
            <li><Link to="/logout">Logout</Link></li>
          </>
        ) : (
          <li><Link to="/login">Login</Link></li>
        )}
      </ul>
    </nav>
  );
};

export default Nvbar;
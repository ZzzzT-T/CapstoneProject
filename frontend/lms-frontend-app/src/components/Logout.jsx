import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const Logout = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    sessionStorage.removeItem('userId');
    logout(); // Update context state
    console.log('Logged out. Session storage cleared.');
    //alert('Logged out successfully!');
    navigate('/login');
  }, [navigate, logout]);

  return <div>Logging out...</div>;
};

export default Logout;
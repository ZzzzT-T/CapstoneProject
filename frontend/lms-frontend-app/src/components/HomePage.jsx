import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const HomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is logged in by verifying userId in sessionStorage
    const userId = sessionStorage.getItem('userId');
    const userRole = sessionStorage.getItem('userRole');
    console.log('HomePage: User userId:', userId);
    console.log('HomePage: User userRole:', userRole);
    // If userId is not found in sessionStorage, redirect to login page
    if (!userId) {
      navigate('/login');  // Replace '/login' with the correct route for your login page
    }
  }, [navigate]);

  return (
    <div>
      <h1>Welcome to the Library Management System</h1>
      <p>This is the home page, and the user is logged in.</p>
      {/* Add other components or content for the home page here */}
    </div>
  );
};

export default HomePage;
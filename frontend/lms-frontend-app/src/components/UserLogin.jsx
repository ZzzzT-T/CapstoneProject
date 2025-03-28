import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from './AuthContext';
import { Link } from 'react-router-dom';
import './UserLogin.css';

const UserLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState('');
  const navigate = useNavigate();
  const { login, loginid } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      alert('Both username and password are required.');
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:9000/api/users/verifyLogin?username=${username}&password=${password}`
      );

      if (response.data.results === 'Login Successfully') {
        sessionStorage.setItem('userId', response.data.userId);
        login(response.data.userRole); // Update context state
        loginid(response.data.userId);
        alert('Login successful!');
        navigate('/home');
      } else {
        setErrors('Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Error validating username:', error);
      setErrors('Invalid username or password');
    }
  };

  return (
    <div className="login-form">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your Username"
            
          />
        </div>
        <div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            
          />
        </div>
        <button type="submit">Login</button>
        {errors && <p role="alert">{errors}</p>}        
      </form>
      <div>
        <p>Don't have an account? <Link to="/register">Register here</Link></p>
      </div>
    </div>
  );
};

export default UserLogin;
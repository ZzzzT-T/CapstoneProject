import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from './AuthContext';
import './UserLogin.css';

const UserLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `http://localhost:9000/api/users/verifyLogin?username=${username}&password=${password}`
      );

      if (response.data.results === 'Login Successfully') {
        sessionStorage.setItem('userId', response.data.userId);
        login(response.data.userRole); // Update context state
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
            required
          />
        </div>
        <div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>
        <button type="submit">Login</button>
        {errors && <p>{errors}</p>}        
      </form>
      <div>
        <p>Don't have an account? <Link to="/register">Register here</Link></p>
      </div>
    </div>
  );
};

export default UserLogin;
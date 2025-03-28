import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './RegistrationForm.css'; // Import the CSS file
import { useNavigate } from 'react-router-dom';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    user_email: '',
    user_fullname: '',
    user_address: '',
    user_contact_info: '',
    user_roles_id: '2',
    user_password: '',
    confirm_password: '',
  });
  const [roles, setRoles] = useState([]);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [isValid, setIsValid] = useState(null); // null = waiting, true = valid, false = invalid
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Fetch roles from the API when the component mounts
  useEffect(() => {
    axios
      .get('http://localhost:9000/api/roles/getAll')
      .then((response) => {
        setRoles(response.data); // Assuming the response is an array of roles
      })
      .catch((error) => {
        console.error('Error fetching roles:', error);
      });
  }, []); // Empty dependency array means this runs only once when the component mounts

  const checkUsername = async (username) => {
    setLoading(true);
    try {
      // Replace with your actual API URL
      const response = await axios.get(`http://localhost:9000/api/users/getUsername/${username}`);
      setIsValid(response.data); 
    } catch (error) {
      console.error('Error validating username:', error);
      setIsValid(false); // Set to false on error if you want to handle that way
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if(e.target.id==="username"){
      const newUsername = e.target.value;
      if (newUsername.trim().length > 0) {
        checkUsername(newUsername);
      } else {
        setIsValid(null); // Reset if empty
      }
    }
    
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if passwords match
    if (formData.user_password !== formData.confirm_password) {
      alert('Passwords do not match!');
      return;
    }

    if(!isValid){
      alert('Please change another username!');
      return;
    }

    // Send the form data to the API
    axios
      .post('http://localhost:9000/api/users/addUser', formData)
      .then((response) => {
        // Handle success
        console.log('User successfully registered:', response.data);
        // You can redirect or show a success message
        navigate('/login');
      })
      .catch((error) => {
        // Handle error
        console.error('Error registering user:', error);
        // You can show an error message to the user
      });
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  // Toggle confirm password visibility
  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  return (
    <div className="registration-form">
      <h2>New User Registration</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            id="user_fullname"
            name="user_fullname"
            value={formData.user_fullname}
            onChange={handleChange}
            placeholder="Enter your Full Name"
            required
          />
        </div>
        <div>
          <input
            type="email"
            id="user_email"
            name="user_email"
            placeholder="Your Email"
            value={formData.user_email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <input
            type="text"
            id="user_address"
            name="user_address"
            placeholder="Your Address"
            value={formData.user_address}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <input
            type="text"
            id="user_contact_info"
            name="user_contact_info"
            placeholder="Your Contact Info"
            value={formData.user_contact_info}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <select
            id="user_roles_id"
            name="user_roles_id"
            value={formData.user_roles_id}
            placeholder="Select Role"
            onChange={handleChange}
            disabled
          >
            <option value="">Select Role</option>
            {roles.map((role) => (
              <option key={role.role_id} value={role.role_id}>
                {role.role_name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter your username for login"
            required
          />
          {loading && <p>Loading...</p>}
          {isValid === true && <p>Username is valid!</p>}
          {isValid === false && <p>Username is in use please choose another!</p>}
        </div>
        <div className="password-container">
          <input
            type={passwordVisible ? 'text' : 'password'}
            id="user_password"
            name="user_password"
            value={formData.user_password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="password-toggle-btn"
          >
            {passwordVisible ? 'Hide' : 'Show'}
          </button>
        </div>
        <div className="password-container">
          <input
            type={confirmPasswordVisible ? 'text' : 'password'}
            id="confirm_password"
            name="confirm_password"
            value={formData.confirm_password}
            onChange={handleChange}
            placeholder="Confirm your password"
            required
          />
          <button
            type="button"
            className="password-toggle-btn"
            onClick={toggleConfirmPasswordVisibility}
          >
            {confirmPasswordVisible ? 'Hide' : 'Show'}
          </button>
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegistrationForm;

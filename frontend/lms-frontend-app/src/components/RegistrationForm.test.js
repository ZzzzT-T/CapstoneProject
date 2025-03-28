import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import RegistrationForm from './RegistrationForm'; // adjust path
import { MemoryRouter } from 'react-router-dom';  // Wrap with MemoryRouter
import axios from 'axios';

// Mock the axios calls
jest.mock('axios');

// Setup the test
describe('RegistrationForm', () => {

    beforeEach(() => {
        jest.clearAllMocks(); // Clear any mock data from previous tests
        global.alert = jest.fn(); // Mock the alert function
    });

  
    test('fetches roles from the API and updates state', async () => {
        // Mock the successful response from the roles API
        axios.get.mockResolvedValueOnce({ data: [{ role_id: 1, role_name: 'Admin' }] });

        render(<MemoryRouter><RegistrationForm /></MemoryRouter>);

        // Wait for the roles to be fetched and displayed
        await waitFor(() => expect(screen.getByText('Admin')).toBeInTheDocument());
    });

    // test('shows alert when passwords do not match', () => {
    //     axios.get.mockResolvedValueOnce({ data: [{ role_id: 1, role_name: 'Admin' }] });
        
    //     // Mock the alert method
    //     global.alert = jest.fn();

    //     render(<MemoryRouter><RegistrationForm /></MemoryRouter>);

    //     // Mock the successful response from the roles API
        
    //     const passwordInput = screen.getByPlaceholderText(/Enter your password/i);
    //     const confirmPasswordInput = screen.getByPlaceholderText(/Confirm your password/i);
    //     const submitButton = screen.getByRole('button', { name: /Register/i });

    //     fireEvent.change(passwordInput, { target: { value: 'password123' } });
    //     fireEvent.change(confirmPasswordInput, { target: { value: 'password321' } });

        
    //     fireEvent.click(submitButton);
    //     screen.debug();

    //     // Expect alert to be called
    //     expect(global.alert).toHaveBeenCalledWith('Passwords do not match!');
    // });



  // test('shows error when username is taken', async () => {
  //   // Mock the API response for checking username
  //   axios.get.mockResolvedValueOnce({ data: false });

  //   render(<MemoryRouter><RegistrationForm /></MemoryRouter>);

  //   // Mock the API response for checking username
  //   axios.get.mockResolvedValueOnce({ data: false });

  //   const usernameInput = screen.getByPlaceholderText(/Enter your username for login/i);
  //   await waitFor(() => expect(global.alert).toHaveBeenCalledWith('Please change another username!'));

  //   fireEvent.change(usernameInput, { target: { value: 'existinguser' } });

  //   // Mock the alert method
  //   global.alert = jest.fn();

  //   // Expect username error message to appear
  //   expect(global.alert).toHaveBeenCalledWith(/Please change another username!/i);
  // });



//   test('submits the form successfully when all data is valid', async () => {
//     render(<RegistrationForm />);

//     // Mock the API responses
//     axios.get.mockResolvedValueOnce({ data: true }); // for checking username availability
//     axios.post.mockResolvedValueOnce({ data: { message: 'User registered successfully' } });

//     const formData = {
//       user_username: 'newuser',
//       user_email: 'test@test.com',
//       user_fullname: 'Test User',
//       user_address: '123 Main St',
//       user_contact_info: '555-5555',
//       user_roles_id: '1',
//       user_password: 'password123',
//       confirm_password: 'password123',
//     };

//     const usernameInput = screen.getByPlaceholderText(/Enter your username for login/i);
//     const emailInput = screen.getByPlaceholderText(/Your Email/i);
//     const fullnameInput = screen.getByPlaceholderText(/Enter your Full Name/i);
//     const addressInput = screen.getByPlaceholderText(/Your Address/i);
//     const contactInfoInput = screen.getByPlaceholderText(/Your Contact Info/i);
//     const roleSelect = screen.getByRole('combobox');
//     const passwordInput = screen.getByPlaceholderText(/Enter your password/i);
//     const confirmPasswordInput = screen.getByPlaceholderText(/Confirm your password/i);
//     const submitButton = screen.getByRole('button', { name: /register/i });

//     fireEvent.change(usernameInput, { target: { value: formData.user_username } });
//     fireEvent.change(emailInput, { target: { value: formData.user_email } });
//     fireEvent.change(fullnameInput, { target: { value: formData.user_fullname } });
//     fireEvent.change(addressInput, { target: { value: formData.user_address } });
//     fireEvent.change(contactInfoInput, { target: { value: formData.user_contact_info } });
//     fireEvent.change(roleSelect, { target: { value: formData.user_roles_id } });
//     fireEvent.change(passwordInput, { target: { value: formData.user_password } });
//     fireEvent.change(confirmPasswordInput, { target: { value: formData.confirm_password } });

//     fireEvent.click(submitButton);

//     // Wait for the form submission to complete
//     await waitFor(() => expect(axios.post).toHaveBeenCalledWith('http://localhost:9000/api/users/addUser', formData));
//   });

//   test('shows alert when username is invalid (taken)', async () => {
//     render(<RegistrationForm />);

//     // Mock the API response for checking username
//     axios.get.mockResolvedValueOnce({ data: false });

//     const usernameInput = screen.getByPlaceholderText(/Enter your username for login/i);
//     fireEvent.change(usernameInput, { target: { value: 'existinguser' } });

//     const submitButton = screen.getByRole('button', { name: /register/i });

//     // Mock the alert method
//     window.alert = jest.fn();

//     fireEvent.click(submitButton);

//     // Expect alert to be called because username is invalid
//     expect(window.alert).toHaveBeenCalledWith('Please change another username!');
//   });
});

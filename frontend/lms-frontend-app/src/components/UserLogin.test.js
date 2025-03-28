import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import UserLogin from './UserLogin'; 
import * as authContext from './AuthContext'; // Adjust the path as needed
import { MemoryRouter } from 'react-router-dom';  // Wrap with MemoryRouter

jest.mock('./AuthContext'); // Mock the AuthContext

describe('UserLogin Component', () => {

  test('should show error message when username is empty', () => {
    authContext.useAuth.mockReturnValue({
      login: jest.fn(),
      loginid: 'mockLoginId',
    });
    
    global.alert = jest.fn();

    render(
      <MemoryRouter>
        <UserLogin />
      </MemoryRouter>
    );


    const usernameInput = screen.getByPlaceholderText(/Enter your Username/i);
    const passwordInput = screen.getByPlaceholderText(/Enter your Password/i);
    const loginButton = screen.getByRole('button', { name: /Login/i });

    expect(usernameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();

    // Fill in the username field but leave the password empty
    fireEvent.change(passwordInput, { target: { value: 'asdas' } });
    fireEvent.click(loginButton);
    screen.debug();

    expect(global.alert).toHaveBeenCalledWith('Both username and password are required.');

  });

  test('should show error message when password is empty', () => {
    authContext.useAuth.mockReturnValue({
      login: jest.fn(),
      loginid: 'mockLoginId',
    });
    
    global.alert = jest.fn();

    render(
      <MemoryRouter>
        <UserLogin />
      </MemoryRouter>
    );


    const usernameInput = screen.getByPlaceholderText(/Enter your Username/i);
    const passwordInput = screen.getByPlaceholderText(/Enter your Password/i);
    const loginButton = screen.getByRole('button', { name: /Login/i });

    expect(usernameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();

    // Fill in the username field but leave the password empty
    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.click(loginButton);
    screen.debug();

    expect(global.alert).toHaveBeenCalledWith('Both username and password are required.');
  });

  
});

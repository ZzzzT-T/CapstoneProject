import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userRole, setUserRole] = useState(sessionStorage.getItem('userRole'));
  const [userId, setUserId] = useState(sessionStorage.getItem('userId'));

  const login = (role) => {
    setUserRole(role);
    sessionStorage.setItem('userRole', role);
  };

  const loginid = (id) => {
    setUserId(id);
    sessionStorage.setItem('userId', id);
  };

  const logout = () => {
    setUserRole(null);
    sessionStorage.removeItem('userRole');
    sessionStorage.removeItem('userId');
  };

  return (
    <AuthContext.Provider value={{ userRole, userId, login, logout, loginid }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
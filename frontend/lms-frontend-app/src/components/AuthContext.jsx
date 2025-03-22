import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userRole, setUserRole] = useState(sessionStorage.getItem('userRole'));

  const login = (role) => {
    setUserRole(role);
    sessionStorage.setItem('userRole', role);
  };

  const logout = () => {
    setUserRole(null);
    sessionStorage.removeItem('userRole');
  };

  return (
    <AuthContext.Provider value={{ userRole, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
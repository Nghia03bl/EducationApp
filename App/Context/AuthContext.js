import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);

  const login = (email, password) => {
    if (email === 'test' && password === '123') {
      setUserData({ email });
      return true;
    }
    return false;
  };

  return (
    <AuthContext.Provider value={{ userData, login }}>
      {children}
    </AuthContext.Provider>
  );
};

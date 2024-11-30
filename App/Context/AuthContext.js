import React, { createContext, useState, useEffect } from 'react';
import { getUserAuth, setUserAuth, Logout } from '../Assets/EducationDatabase.db';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    getUserAuth()
      .then(user => setUserData(user))
      .catch(err => console.log('Error getting user data', err));
  }, []);

  const login = (email, password) => {
    getUserAuth()
      .then(user => {
        if (user.email === email && user.password === password) {
          setUserData(user);
        } else {
          console.log('Invalid email or password');
        }
      })
      .catch(err => console.log('Error logging in', err));
  };

  const register = (email, password) => {
    setUserAuth({ email, password })
      .then(() => {
        console.log('User registered successfully');
      })
      .catch(err => console.log('Error registering user', err));
  };

  // Đăng xuất
  const logout = () => {
    setUserData(null);
    Logout();
  };

  return (
    <AuthContext.Provider value={{ userData, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

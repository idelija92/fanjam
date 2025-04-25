import React, { useState, useEffect } from 'react';
import API from '../services/api';

export const AuthContext = React.createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);
  const [role, setRole] = useState(getRoleFromToken(token));
  const [currentUser, setCurrentUser] = useState(null);

  const login = (newToken) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
    setRole(getRoleFromToken(newToken));
    setIsAuthenticated(true);

    fetchCurrentUser(newToken);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setRole(null);
    setIsAuthenticated(false);
    setCurrentUser(null);
  };

  const fetchCurrentUser = async (tkn) => {
    try {
      const res = await API.get('/auth/me', {
        headers: { Authorization: `Bearer ${tkn || token}` }
      });
      setCurrentUser(res.data);
    } catch (err) {
      console.error('Failed to fetch current user:', err);
      setCurrentUser(null);
    }
  };

  function getRoleFromToken(token) {
    if (!token) return null;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.role || null;
    } catch {
      return null;
    }
  }

  useEffect(() => {
    setIsAuthenticated(!!token);
    if (token && !currentUser) {
      fetchCurrentUser();
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, isAuthenticated, role, currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

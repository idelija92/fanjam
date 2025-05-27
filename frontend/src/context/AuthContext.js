import React, { useState, useEffect } from 'react';
import API from '../services/api';

export const AuthContext = React.createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);
  const [roles, setRoles] = useState(getRolesFromToken(token));
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    setIsAuthenticated(!!token);
    if (token && !currentUser) {
      fetchCurrentUser();
    }
  }, [token]);

  const login = (newToken) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
    setRoles(getRolesFromToken(newToken));
    setIsAuthenticated(true);
    fetchCurrentUser(newToken);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setRoles([]);
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

  function getRolesFromToken(token) {
    if (!token) return [];
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.roles || [];
    } catch {
      return [];
    }
  }

  return (
    <AuthContext.Provider value={{
      token,
      isAuthenticated,
      roles,
      currentUser,
      login,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
}

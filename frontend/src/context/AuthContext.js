import * as React from 'react';

export const AuthContext = React.createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = React.useState(localStorage.getItem('token'));
  const [isAuthenticated, setIsAuthenticated] = React.useState(!!token);
  const [role, setRole] = React.useState(getRoleFromToken(token));

  const login = (newToken) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
    setRole(getRoleFromToken(newToken));
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setRole(null);
    setIsAuthenticated(false);
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

  React.useEffect(() => {
    setIsAuthenticated(!!token);
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, isAuthenticated, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

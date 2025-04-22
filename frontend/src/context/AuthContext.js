import * as React from 'react';

export const AuthContext = React.createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = React.useState(localStorage.getItem('token'));
  const [isAuthenticated, setIsAuthenticated] = React.useState(!!token);

  const login = (newToken) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setIsAuthenticated(false);
  };

  React.useEffect(() => {
    setIsAuthenticated(!!token);
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

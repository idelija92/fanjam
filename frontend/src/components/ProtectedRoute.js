import React from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ children, requiredRole }) => {
  const auth = React.useContext(AuthContext);

  if (!auth?.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole) {
    if (!auth?.roles || auth.roles.length === 0) {
      return <p>Loading roles...</p>;
    }
    if (!auth.roles.includes(requiredRole)) {
      return <p>⛔ Access denied (requires {requiredRole})</p>;
    }
  }

  return children;
};

export default ProtectedRoute;

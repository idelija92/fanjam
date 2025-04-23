import React from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ children, requiredRole }) => {
  const auth = React.useContext(AuthContext);

  if (!auth?.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && auth?.role !== requiredRole) {
    return <p>⛔ Access denied (requires {requiredRole})</p>;
  }

  return children;
};

export default ProtectedRoute;

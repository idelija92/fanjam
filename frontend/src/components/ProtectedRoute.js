import React from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ children, requiredRoles = [] }) => {
  const { isAuthenticated, roles } = React.useContext(AuthContext);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRoles.length > 0) {
    if (!roles || roles.length === 0) {
      return <p>Loading roles...</p>;
    }
    const hasAccess = requiredRoles.some(role => roles.includes(role));
    if (!hasAccess) {
      return <p>⛔ Access denied (requires one of: {requiredRoles.join(', ')})</p>;
    }
  }

  return children;
};

export default ProtectedRoute;

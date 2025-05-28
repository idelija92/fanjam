import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import useRole from '../hooks/useRole';

const Header = () => {
  const auth = React.useContext(AuthContext);
  const navigate = useNavigate();
  const { isAdmin, isVenue, isBand } = useRole();

  const getUsernameFromToken = (token) => {
    if (!token) return 'Unknown';
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.username || 'Unknown';
    } catch (e) {
      return 'Unknown';
    }
  };

  return (
    <header style={{ padding: '1rem', borderBottom: '1px solid #ccc' }}>
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/" style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
          FanJam 🎹
        </Link>

        <div>
          {auth && auth.isAuthenticated ? (
            <>
              <span style={{ marginRight: '1rem' }}>
                Logged in as: <strong>{getUsernameFromToken(auth.token)}</strong> ({auth.roles.join(', ')})
              </span>
              {isAdmin() && (
                <Link to="/admin/users" style={{ marginRight: '1rem' }}>Admin Panel</Link>
              )}
              {isVenue() && (
                <Link to="/venue/dashboard" style={{ marginRight: '1rem' }}>Venue Dashboard</Link>
              )}
              {isBand() && (
                <Link to="/band/dashboard" style={{ marginRight: '1rem' }}>Band Dashboard</Link>
              )}
              <Link to="/profile" style={{ marginRight: '1rem' }}>My Profile</Link>
              <button onClick={() => { auth.logout(); navigate('/'); }}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" style={{ marginRight: '1rem' }}>Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;

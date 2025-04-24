import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Header = () => {
  const auth = React.useContext(AuthContext);
  const navigate = useNavigate();

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
                Logged in as: <strong>{getUsernameFromToken(auth.token)}</strong> ({getRoleFromToken(auth.token)})
              </span>
              <span>
                {getRoleFromToken(auth.token) === 'ADMIN' && (
                  <Link to="/admin/users" style={{ marginRight: '1rem' }}>Admin Panel</Link>
                )}
              </span>
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

function getUsernameFromToken(token) {
    if (!token) return 'Unknown';
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.username || 'Unknown';
    } catch (e) {
      return 'Unknown';
    }
  }

export default Header;

function getRoleFromToken(token) {
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.role || null;
  } catch {
    return null;
  }
}

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import useRole from '../hooks/useRole';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Navbar, Nav } from 'react-bootstrap';
import { Container } from "react-bootstrap";

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

 <nav className="navbar navbar-expand-lg navbar-light bg-light">
<div className="container">
 <Link className="navbar-brand" to="/">
          <img className="logo" src="Fanjamlogo11.png" alt="Fanjam Logo" height="40" />
        </Link>

     <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/">Home</Link>
                </li>

                {auth?.isAuthenticated ? (
                  <>
                    <li className="nav-item">
                      <span className="nav-link disabled">
                        Logged in as <strong>{getUsernameFromToken(auth.token)}</strong>
                      </span>
                    </li>

                    {isAdmin() && (
                      <li className="nav-item">
                        <Link className="nav-link" to="/admin/users">Admin Panel</Link>
                      </li>
                    )}
                    {isVenue() && (
                      <li className="nav-item">
                        <Link className="nav-link" to="/venue/dashboard">Venue Dashboard</Link>
                      </li>
                    )}
                    {isBand() && (
                      <li className="nav-item">
                        <Link className="nav-link" to="/band/dashboard">Band Dashboard</Link>
                      </li>
                    )}
                    <li className="nav-item">
                      <Link className="nav-link" to="/profile">My Profile</Link>
                    </li>
                    <li className="nav-item">
                      <button
                        className="btn btn-link nav-link"
                        onClick={() => {
                          auth.logout();
                          navigate('/');
                        }}
                      >
                        Logout
                      </button>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to="/login">Login</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/register">Register</Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </nav>
      );
    };

export default Header;

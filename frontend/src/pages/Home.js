import React, { useEffect, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import API from '../services/api';
import "./Home.css";

const Home = () => {
  const auth = useContext(AuthContext);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await API.get('/events');
        setEvents(res.data || []);
      } catch (err) {
        console.error('Failed to load events', err);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="home-container">
      <h1 className="home-title">Welcome to FanJam 🎸🎷🎧🎶</h1>

      <nav>
        <ul className="nav-links">
          <li><Link to="/bands">Browse Bands</Link></li>
          <li><Link to="/events">View Events</Link></li>
        </ul>
      </nav>

      {auth?.isAuthenticated && auth.roles?.includes('ADMIN') && (
        <div className="admin-tools">
          <h3>Admin Tools</h3>
          <ul>
            <li><Link to="/bands/create">➕ Add New Band</Link></li>
            <li><Link to="/events/create">➕ Add New Event</Link></li>
            <li><Link to="/users/create">➕ Add New User</Link></li>
            <li><Link to="/users">👤 Manage Users</Link></li>
          </ul>
        </div>
      )}


      <h2 className="events-heading">Current Events</h2>

      {events.length === 0 ? (
        <p>No events available yet!</p>
      ) : (
        <div>
          {events.map(event => (
            <div key={event.id} className="event-card">
              <h3 className="event-title">{event.title}</h3>
              <p className="event-details">{event.date} at <strong>{event.venue}</strong></p>
              <div className="event-links">
                <Link to={`/events/${event.id}/winners`} className="rankings">
                  🏆 View Song Rankings
                </Link>
              </div>
              {auth?.isAuthenticated && (
                <div className="event-links">
                  <Link to={`/events/${event.id}/vote`} className="vote">
                    🎤 Vote for Songs
                  </Link>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;

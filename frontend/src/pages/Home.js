import React, { useEffect, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import API from '../services/api';

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
    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
      <h1>Welcome to FanJam 🎸🎷🎧🎶</h1>

      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {/* Always visible links (even for guests) */}
        <li><Link to="/bands">Browse Bands</Link></li>
        <li><Link to="/events">View Events</Link></li>
      </ul>

      {/* Admin-only create links */}
      {auth?.isAuthenticated && auth.role === 'ADMIN' && (
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          <li><Link to="/bands/create">➕ Add New Band</Link></li>
          <li><Link to="/events/create">➕ Add New Event</Link></li>
          <li><Link to="/users">Manage Users</Link></li>
          <li><Link to="/users/create">➕ Add New User</Link></li>
        </ul>
      )}

      <h2 style={{ marginTop: '3rem' }}>Current Events:</h2>

      {events.length === 0 ? (
        <p>No events available yet!</p>
      ) : (
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {events.map(event => (
            <li key={event.id} style={{ marginBottom: '2rem' }}>
              <h3>{event.title}</h3>
              <p>{event.date} at {event.venue}</p>
              <Link to={`/events/${event.id}/winners`}>
                🏆 View Song Rankings
              </Link>
              {auth?.isAuthenticated && (
                <>
                  <br />
                  <Link to={`/events/${event.id}/vote`}>
                    🎤 Vote for Songs
                  </Link>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Home;

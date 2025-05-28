// src/pages/BandDashboard.js
import React, { useEffect, useState, useContext } from 'react';
import API from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const BandDashboard = () => {
  const { currentUser } = useContext(AuthContext);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBandEvents = async () => {
      try {
        const res = await API.get('/events');
        const userEmail = currentUser?.email;
        const filtered = res.data.filter(event =>
          event.bands?.some(band => band.users?.some(user => user.email === userEmail))
        );
        setEvents(filtered);
      } catch (err) {
        console.error('Failed to load events for band', err);
      } finally {
        setLoading(false);
      }
    };

    if (currentUser?.email) {
      fetchBandEvents();
    }
  }, [currentUser]);

  return (
    <div className="container">
      <h1>🎸 Band Dashboard</h1>
      <p>Welcome, {currentUser?.email}!</p>

      <h2>Upcoming Events</h2>

      {loading ? (
        <p>Loading...</p>
      ) : events.length === 0 ? (
        <p>No upcoming events assigned to your band.</p>
      ) : (
        <ul>
          {events.map(event => (
            <li key={event.id}>
              <strong>{event.title}</strong> — {event.date} at {event.venue}
              <br />
              <Link to={`/events/edit/${event.id}`}>✏️ Edit Setlist</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BandDashboard;

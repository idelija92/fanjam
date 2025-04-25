import React, { useEffect, useState } from 'react';
import API from '../services/api';
import { Link } from 'react-router-dom';

const Events = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    API.get('/events').then(res => setEvents(res.data));
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this event?')) return;
    try {
      await API.delete(`/events/${id}`);
      setEvents(events.filter(e => e.id !== id));
    } catch (err) {
      console.error('Delete failed', err);
    }
  };

  return (
    <div>
      <h1>Events</h1>
      <Link to="/">← Back to Home</Link>
      <table border="1" cellPadding="8" style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Date/Time</th>
            <th>Venue</th>
            <th>Location</th>
            <th>Type</th>
            <th>Bands</th>
            <th>Setlist</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {events.map(event => (
            <tr key={event.id}>
              <td>{event.title}</td>
              <td>{event.date} {event.time}</td>
              <td>{event.venue}</td>
              <td>{event.location}</td>
              <td>{event.type}</td>
              <td>
                {event.bands?.map(b => b.name).join(', ')}
              </td>
              <td>
                <ul style={{ margin: 0, paddingLeft: '1rem' }}>
                  {event.setlist?.map((song, i) => (
                    <li key={i}>{song}</li>
                  ))}
                </ul>
              </td>
              <td>
                <Link to={`/events/edit/${event.id}`}>Edit</Link> |{' '}
                <button onClick={() => handleDelete(event.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
};

export default Events;

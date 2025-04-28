import React, { useEffect, useState, useContext } from 'react';
import API from '../services/api';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Events = () => {
  const [events, setEvents] = useState([]);
  const auth = useContext(AuthContext);

  useEffect(() => {
    API.get('/events').then(res => {
      console.log('Loaded events:', res.data);
      setEvents(res.data);
    });
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

  const handleRsvp = async (eventId) => {
    try {
      await API.put(`/events/${eventId}/rsvp`);
      const updated = await API.get('/events');
      setEvents(updated.data);
      alert('RSVP successful!');
    } catch (err) {
      console.error(err);
      alert('Failed to RSVP');
    }
  };

  const handleCancelRsvp = async (eventId) => {
    try {
      await API.delete(`/events/${eventId}/rsvp`);
      const updated = await API.get('/events');
      setEvents(updated.data);
      alert('RSVP cancelled');
    } catch (err) {
      console.error(err);
      alert('Failed to cancel RSVP');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1>Events</h1>
      <Link to="/">← Back to Home</Link>
      <table border="1" cellPadding="8" style={{ borderCollapse: 'collapse', width: '75%', marginTop: '1rem' }}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Date/Time</th>
            <th>Venue</th>
            <th>Location</th>
            <th>Type</th>
            <th>Description</th>
            <th>Bands</th>
            <th>Setlist</th>
            <th>RSVP</th>
            <th>Admin</th>
          </tr>
        </thead>
        <tbody>
          {events.map(event => {
            console.log('Current user email:', auth.currentUser?.email);
            console.log('RSVP list for event', event.id, ':', event.rsvps);
            const isAttending = event.rsvps?.some(u => u.email === auth.currentUser?.email);

            return (
              <tr key={event.id}>
                <td>{event.title}</td>
                <td>{event.date} {event.time}</td>
                <td>{event.venue}</td>
                <td>{event.location}</td>
                <td>{event.type}</td>
                <td>{event.description}</td>
                <td>{event.bands?.map(b => b.name).join(', ')}</td>
                <td>
                  <ul style={{ margin: 0, paddingLeft: '1rem' }}>
                    {event.setlist?.map((song, i) => (
                      <li key={i}>{song}</li>
                    ))}
                  </ul>
                </td>
                <td>
                  {auth?.isAuthenticated && (
                    <div>
                      {isAttending ? (
                        <>
                          <div><em>✅ You are attending</em></div>
                          <button onClick={() => handleCancelRsvp(event.id)}>Cancel RSVP</button>
                        </>
                      ) : (
                        <button onClick={() => handleRsvp(event.id)}>Join Event</button>
                      )}
                      <div><strong>RSVP Count:</strong> {event.rsvps?.length || 0}</div>
                      {event.rsvps && event.rsvps.length > 0 && (
                        <div>
                          <strong>Attending:</strong>
                          <ul style={{ margin: 0, paddingLeft: '1rem' }}>
                            {event.rsvps.map(user => (
                              <li key={user.id}>
                                {user.username || user.email}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                    </div>

                  )}

                </td>
                <td>
                  <Link to={`/events/edit/${event.id}`}>Edit</Link> |{' '}
                  <button onClick={() => handleDelete(event.id)}>Delete</button>
                  <Link to={`/events/${event.id}/vote`}>Vote</Link><br />
                  <Link to={`/events/${event.id}/winners`}>Rankings</Link>
                </td>
              </tr>
            );
          })}

        </tbody>
      </table>
    </div>
  );
};

export default Events;

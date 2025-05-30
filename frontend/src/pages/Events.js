import React, { useEffect, useState, useContext } from 'react';
import API from '../services/api';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import useRole from '../hooks/useRole';
import "./styles/Events.css";
import EventCard from '../components/EventCard';

const Events = () => {
  const [events, setEvents] = useState([]);
  const auth = useContext(AuthContext);
  const { isAdmin, isUser, isVenue, isBand } = useRole();

  useEffect(() => {
    API.get('/events').then(res => {
      const uniqueEvents = Array.from(
        new Map(res.data.map(e => [e.id, e])).values()
      );
      setEvents(uniqueEvents);
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
    <div className="events-container">
      <h1 className="events-title">Events</h1>
      {events.length === 0 ? (
        <p>No events yet!</p>
      ) : (
        <div className="event-list">
          {events.map(event => {
            const isAttending = event.rsvps?.some(
              u => u.email === auth.currentUser?.email
            );

            return (
              <div key={event.id}>
                <EventCard
                  event={event}
                  isAttending={isAttending}
                  onRsvp={isUser || isAdmin ? handleRsvp : undefined}
                  onCancelRsvp={isUser || isAdmin ? handleCancelRsvp : undefined}
                  onDelete={isAdmin || isVenue ? handleDelete : undefined}
                  showEditDelete={isAdmin || isVenue}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Events;

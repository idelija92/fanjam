import React from 'react';
import { Link } from 'react-router-dom';

const EventCard = ({ event, isAuthenticated }) => {
  if (!event || !event.id || !event.title) return null;

  return (
    <article className="event-card">
      <h3 className="event-title">{event.title}</h3>
      <p className="event-details">
        {event.date} at <strong>{event.venue}</strong>
      </p>
      <div className="event-links">
        <Link to={`/events/${event.id}/winners`} className="rankings">
          🏆 View Song Rankings
        </Link>
        {isAuthenticated && (
          <Link to={`/events/${event.id}/vote`} className="vote">
            🎤 Vote for Songs
          </Link>
        )}
      </div>
    </article>
  );
};

export default EventCard;

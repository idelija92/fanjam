import React from 'react';
import { Link } from 'react-router-dom';
import './EventCard.css';

const EventCard = ({ event, isAdmin, isAttending, onRsvp, onCancelRsvp, onDelete }) => {
    return (
        <div className="event-card-container">
            <h3>{event.title}</h3>
            <p><strong>Date:</strong> {event.date} at {event.time}</p>
            <p><strong>Venue:</strong> {event.venue}</p>
            <p><strong>Location:</strong> {event.location}</p>
            <p><strong>Description:</strong> {event.description}</p>
            <p><strong>Type:</strong> {event.type}</p>
            <p><strong>Bands:</strong> {event.bands?.map(b => b.name).join(', ')}</p>
            <p><strong>Setlist:</strong></p>
            <ul>
                {event.setlist?.map((song, i) => (
                    <li key={i}>{song}</li>
                ))}
            </ul>

            <div className="event-actions">
                <Link to={`/events/${event.id}/winners`}>🏆 Rankings</Link>
                <Link to={`/events/${event.id}/vote`}>🎤 Vote</Link>
            </div>

            <div className="rsvp-section">
                {isAttending ? (
                    <>
                        <p>✅ You are attending</p>
                        <button onClick={() => onCancelRsvp(event.id)}>Cancel RSVP</button>
                    </>
                ) : (
                    <button onClick={() => onRsvp(event.id)}>RSVP</button>
                )}
                <p><strong>Attending:</strong> {event.rsvps?.length || 0}</p>
            </div>

            {isAdmin && (
                <div className="admin-controls">
                    <Link to={`/events/edit/${event.id}`}>Edit</Link> |{' '}
                    <button onClick={() => onDelete(event.id)}>Delete</button>
                </div>
            )}
        </div>
    );
};

export default EventCard;

import React from 'react';
import { Link } from 'react-router-dom';
import './EventCard.css';
import useRole from '../hooks/useRole';

const EventCard = ({
    event,
    isAttending,
    onRsvp,
    onCancelRsvp,
    onDelete,
    showEditDelete = false,
}) => {
    const { isUser, isAdmin, isVenue } = useRole();

    const canVote = isUser || isAdmin;
    const canRsvp = isUser || isAdmin;
    const isVenueUser = isVenue();
    const canEditDelete = showEditDelete;

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
                {canVote && (
                    <Link to={`/events/${event.id}/vote`}>🎤 Vote</Link>
                )}
            </div>

            {canRsvp && (
                <div className="rsvp-section">
                    {isAttending ? (
                        <>
                            <p>✅ You are attending</p>
                            <button onClick={() => onCancelRsvp?.(event.id)}>Cancel RSVP</button>
                        </>
                    ) : (
                        <button onClick={() => onRsvp?.(event.id)}>RSVP</button>
                    )}
                </div>
            )}

            <p><strong>Attending:</strong> {event.rsvps?.length || 0}</p>

            {canEditDelete && (
                <div className="admin-controls">
                    <Link to={`/events/edit/${event.id}`}>Edit</Link> |{' '}
                    <button onClick={() => onDelete?.(event.id)}>Delete</button>
                </div>
            )}
        </div>
    );
};

export default EventCard;
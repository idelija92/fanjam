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

    const { isUser, isAdmin, isVenue, isBand } = useRole();

    const canVote = isUser() || isAdmin();
    const canRsvp = isUser() || isAdmin();
    const canEditDelete = isAdmin() || isVenue();


    return (
        <div className="event-card-container">
            <h3>{event.title}</h3>
            <p><strong>Date:</strong> {event.date} at {event.time}</p>
            <p><strong>Venue:</strong> {event.venue}</p>
            <p><strong>Location:</strong> {event.location}</p>
            <p><strong>Description:</strong> {event.description}</p>
            <p><strong>Type:</strong> {event.type}</p>
            <p><strong>Bands & Setlists:</strong></p>
            <ul>
                {event.bands?.map(band => (
                    <li key={band.id}>
                        <strong>{band.name}</strong>
                        {band.customSongSlots != null && (
                            <p>🎶 Custom Song Slots: {band.customSongSlots}</p>
                        )}
                        {band.setlist?.length > 0 && (
                            <ul>
                                {band.setlist.map((song, i) => (
                                    <li key={i}>🎵 {song}</li>
                                ))}
                            </ul>
                        )}
                    </li>
                ))}
            </ul>

            <div className="event-actions">
                <Link to={`/events/${event.id}/winners`}>🏆 Rankings</Link><br></br>
                <p><strong>Attending:</strong> {event.rsvps?.length || 0}</p>
            </div>

            {canVote && (
                <Link to={`/events/${event.id}/vote`}>🎤 Vote</Link>
            )}

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

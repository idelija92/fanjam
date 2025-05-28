// src/pages/BandDashboard.js
import React, { useEffect, useState, useContext } from 'react';
import API from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const BandDashboard = () => {
    const { token, currentUser } = useContext(AuthContext);
    const [band, setBand] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchMyBand = async () => {
            try {
                const res = await API.get('/bands/my', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setBand(res.data);
            } catch (err) {
                console.error('Failed to fetch band:', err);
                setError('No band found for your account.');
            } finally {
                setLoading(false);
            }
        };

        fetchMyBand();
    }, [token]);

    return (
        <div className="container">
            <h1>🎸 Band Dashboard</h1>
            <p>Welcome, {currentUser?.email}!</p>

            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p style={{ color: 'red' }}>{error}</p>
            ) : (
                <>
                    <h2>{band.name}</h2>
                    <p><strong>Genre:</strong> {band.genre}</p>
                    <p><strong>Description:</strong> {band.description}</p>

                    <h3>Upcoming Events</h3>
                    {band.events.length === 0 ? (
                        <p>No upcoming events.</p>
                    ) : (
                        <ul>
                            {band.events.map(event => (
                                <li key={event.id}>
                                    <strong>{event.title}</strong> — {event.date} at {event.venue}
                                    <br />
                                    <Link to={`/events/edit/${event.id}`}>✏️ Edit Setlist</Link>
                                </li>
                            ))}
                        </ul>
                    )}
                </>
            )}
        </div>
    );
};

export default BandDashboard;

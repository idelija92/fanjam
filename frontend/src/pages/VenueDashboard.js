import React, { useEffect, useState, useContext } from 'react';
import API from '../services/api';
import { AuthContext } from '../context/AuthContext';
import EventCard from '../components/EventCard';
import { useNavigate } from 'react-router-dom';
import { Card, ListGroup, Button, Navbar, Nav, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const VenueDashboard = () => {
    const [events, setEvents] = useState([]);
    const { token } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCreatedEvents = async () => {
            try {
                const res = await API.get('/events/created', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setEvents(res.data);
            } catch (err) {
                console.error('Failed to fetch events created by venue:', err);
            }
        };

        fetchCreatedEvents();
    }, [token]);

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this event?')) return;
        try {
            await API.delete(`/events/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setEvents(events.filter((e) => e.id !== id));
        } catch (err) {
            console.error('Failed to delete event:', err);
        }
    };

    return (



        <div className="events-container">
        <h1 className="events-title">Venue Dashboard</h1>
                <div className="mt-3 text-muted">
            <p><strong>Events created by you:</strong></p>
            </div>

            {events.length === 0 ? (
                <p>No events created yet.</p>
            ) : (
                events.map((event) => (
                    <EventCard
                        event={event}
                        onDelete={handleDelete}
                        showEditDelete={true}
                    />

                ))
            )}
        </div>

    );
};

export default VenueDashboard;

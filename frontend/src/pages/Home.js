import React, { useEffect, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import EventCard from '../components/EventCard';
import { AuthContext } from '../context/AuthContext';
import useRole from '../hooks/useRole';
import API from '../services/api';
import "./styles/Home.css";

const Home = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const { isAdmin, isVenue, isBand } = useRole();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await API.get('/events');
        setEvents(res.data || []);
      } catch (err) {
        console.error('Failed to load events', err);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="home-container">

      <section className='hero'>
        <h1 className='hero-title'>Welcome to FanJam</h1>
        <p className="home-subtitle">Discover. Vote. Celebrate Local Talent.</p>

        <div className='hero-buttons'>
          <Link to="/bands">Browse Bands</Link>
          <Link to="/events">View Events</Link>
        </div>
      </section>

      {isAuthenticated && isAdmin() && (
        <div className="admin-tools">
          <h3>Admin Tools</h3>
          <ul>
            <li><Link to="/bands/create">➕ Add New Band</Link></li>
            <li><Link to="/events/create">➕ Add New Event</Link></li>
            <li><Link to="/users/create">➕ Add New User</Link></li>
            <li><Link to="/users">👤 Manage Users</Link></li>
          </ul>
        </div>
      )}

      {isAuthenticated && isVenue() && !isAdmin() && (
        <div className="admin-tools">
          <h3>Venue Tools</h3>
          <ul>
            <li><Link to="/events/create">➕ Add New Event</Link></li>
          </ul>
        </div>
      )}

      <h2 className="events-heading">Current Events</h2>

      {events.length === 0 ? (
        <p>No events available yet!</p>
      ) : (
      <div className='event-grid'>
        {events.map(event => ( 
          <EventCard key={event.id} event={event} isAuthenticated={isAuthenticated}/>
          ))}
      </div>
      )}

{/* TODO: Add in a HERO dashboard here  */}


    </div>
  );
};

export default Home;

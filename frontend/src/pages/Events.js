import React, { useEffect, useState } from 'react';
import API from '../services/api';
import { Link } from 'react-router-dom';

const Events = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    API.get('/events').then(res => setEvents(res.data));
  }, []);

  return (
    <div>
      <h1>Events</h1>
      <Link to="/">← Back to Home</Link>
      <ul>
        {events.map(event => (
          <li key={event.id}>
            <strong>{event.title}</strong><br />
            {event.date} at {event.time}<br />
            Venue: {event.venue}<br />
            {event.description && <em>{event.description}</em>}<br />
            {event.bands && event.bands.length > 0 && (
            <div>
              Bands:
              <ul>
                {event.bands.map(band => (
                  <li key={band.id}>{band.name}</li>
                ))}
              </ul>
            </div>
          )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Events;

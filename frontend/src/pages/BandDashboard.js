// src/pages/BandDashboard.js
import React, { useEffect, useState, useContext } from 'react';
import API from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { Card, ListGroup, Button, Navbar, Nav, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';



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

    const getEventImage = (event) => {
          if (event.venue === 'The Curragh Racecourse') return '/Horse-Country.png';
          if (event.venue === 'Shenanigans Pub') return '/flame_guitar_venue.png';
          if (event.venue === 'Messers Pub') return 'crowd_hands_up.jpg';
          if (event.venue === 'Whelans') return 'mics.png';
          if (event.location === 'Dublin') return '/mic2.png';
          return '/guitar.jpg';
        };

        const getBandImage = (band) => {
                if (band.name === 'Bon Jovi Tribute') return "https://1000logos.net/wp-content/uploads/2016/10/Bon-Jovi-Symbol.jpg";
                if (band.name === 'Ed Sheeran Tribute') return 'https://1000logos.net/wp-content/uploads/2024/06/Ed-Sheeran-Logo.png';
                if (band.name === 'AbbA Tribute') return 'https://1000logos.net/wp-content/uploads/2024/06/Abba-Logo.png';
                if (band.name === 'Queen Tribute') return 'https://1000logos.net/wp-content/uploads/2024/06/Queen-Logo.png';
                if (band.name === 'Green Day Tribute') return 'https://1000logos.net/wp-content/uploads/2024/06/Green-Day-Logo.png';
                if (band.name === 'Iron Maiden Tribute') return 'https://1000logos.net/wp-content/uploads/2024/07/Iron-Maiden-Logo-768x432.png';
                return '/piano.jpg';
              };

return (
  <div className="bands-container">
    <h1 className="bands-title">Band Dashboard</h1>
    <div className="mt-3 text-muted">
    <strong>Welcome <br></br> {currentUser?.email}!</strong>
    </div>

    {loading ? (
      <p>Loading...</p>
    ) : error ? (
      <p style={{ color: 'red' }}>{error}</p>
    ) : (
      <>
        {/* Band Info Card */}
        <div className="d-flex justify-content-center mt-4">
          <div className="col-md-10">
            <Card className="shadow">
              <Card.Img
                variant="top"
                /*src="https://1000logos.net/wp-content/uploads/2016/10/Bon-Jovi-Symbol.jpg"
                  alt={band.name}
                  style={{ objectFit: 'cover', maxHeight: '300px' }}*/
                src={getBandImage(band)}
                alt={band.name}
                style={{ objectFit: 'cover',objectPosition: 'center', maxHeight: '300px' }}

              />
              <Card.Header className="bg-secondary text-white text-center">
                <h5 className="mb-0">{band.name}</h5>
              </Card.Header>
              <Card.Body className="p-0">
                <ListGroup className="list-group-flush text-center">
                  <ListGroup.Item>
                    <div className="mt-3">Description</div>
                    <h6>
                      <strong>{band.description}</strong>
                    </h6>
                    <br></br>
                    <strong>Genre:</strong> {band.genre}
                  </ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>
          </div>
        </div>

        {/* Upcoming Events Card */}
        <div className="bands-container">
            <h1 className="events-title">Upcoming Events</h1>
            <div className="mt-3 text-muted">
            <strong>For {band.name}</strong>
            </div>
            </div>

        <div className="d-flex justify-content-center mt-4">
          <div className="col-md-10">
            {band.events.length === 0 ? (
              <Card className="shadow">
                <Card.Header className="bg-secondary text-white text-center">
                  <h5 className="mb-0">Upcoming Events</h5>
                </Card.Header>
                <Card.Body className="p-3 text-center">
                  <p>No upcoming events.</p>
                </Card.Body>
              </Card>
            ) : (
              band.events.map(event => (
                <Card key={event.id} className="shadow mb-4">
                  <Card.Img
                    variant="top"
                    src={getEventImage(event)}
                    alt={event.title}
                    style={{
                      objectFit: 'cover',
                      objectPosition: 'center',
                      maxHeight: '300px',
                      width: '100%',
                    }}
                  />
                  <Card.Header className="bg-secondary text-white text-center">
                    <h5 className="mb-0">{event.title}</h5>
                  </Card.Header>
                  <Card.Body className="p-3 text-center">
                    <div className="text-muted mb-2">
                      <strong>{event.date}</strong> at <strong>{event.venue}</strong>
                    </div>
                    <Link
                      to={`/events/${event.id}/setlist`}
                      className="btn btn-secondary"
                    >
                      Edit Your Setlist
                    </Link>
                  </Card.Body>
                </Card>
              ))
            )}
          </div>
        </div>




                  {/*  <h2>{band.name}</h2>
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
                                    <Link to={`/events/${event.id}/setlist`}>✏️ Edit Your Setlist</Link>
                                </li>
                            ))}
                        </ul>
                    )}
                    */}
                </>
            )}
        </div>
    );
};

export default BandDashboard;

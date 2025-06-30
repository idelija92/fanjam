import React, { useEffect, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import useRole from '../hooks/useRole';
import API from '../services/api';
import "./styles/Home.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Navbar, Nav } from 'react-bootstrap';


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
  <>
 <section className="jumbotron text-center">
   <div className="container text-center py-5">
     <div className="col-md-8 mx-auto">
       <h1 className="display-7 fw-normal">Welcome to</h1>
       <img className="logo" src="Fanjampic6.png" alt="Fanjam Logo" height="50" />
<hr></hr>
       <p className="lead fw-muted">
         Be apart of the event with Fanjam. A new and exciting interactive experience for Fans and Bands.
</p>
<p className="lead fw-normal">
Are you ready to to Jam?
       </p>
       <p>
         <a href="/bands" className="btn btn-primary my-2 me-3">Browse Bands</a>
         <a href="/events" className="btn btn-secondary my-2">View Events</a>
       </p>
     </div>
   </div>
 </section>



<section>
<div className="position-relative overflow-hidden bg-light w-100">
  <div className="container text-center py-5">
    <div className="col-md-8 mx-auto">
      <h1 className="display-4 fw-normal">Punny headline</h1>
      <p className="lead fw-normal">
        And an even wittier subheading to boot. Jumpstart your marketing efforts with this example based on Apple's marketing pages.
      </p>
      <a className="btn btn-outline-secondary" href="#">Coming soon</a>
    </div>
  </div>
  </div>
  </section>
 <body>
<div className="bg-light w-100 py-5">
  <div className="container text-center">
    <div className="col-md-8 mx-auto my-5">
      <h1 className="display-4 fw-normal">Punny headline</h1>
      <p className="lead fw-normal">
        And an even wittier subheading to boot. Jumpstart your marketing efforts with this example based on Apple's marketing pages.
      </p>
      <a className="btn btn-outline-secondary" href="#">Coming soon</a>
    </div>
  </div>
</div>
     <div class="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center bg-light">
       <div class="col-md-5 p-lg-5 mx-auto my-5">
         <h1 class="display-4 font-weight-normal">Punny headline</h1>
         <p class="lead font-weight-normal">And an even wittier subheading to boot. Jumpstart your marketing efforts with this example based on Apple's marketing pages.</p>
         <a class="btn btn-outline-secondary" href="#">Coming soon</a>
       </div>
       <div class="product-device box-shadow d-none d-md-block"></div>
       <div class="product-device product-device-2 box-shadow d-none d-md-block"></div>
     </div>




    </body>

    <div className="home-container">
      <h1 className="home-title">Welcome to FanJam 🎸🎷🎧🎶</h1>
<img className="logo" src="Fanjamlogo11.png" alt="Fanjam Logo"/>
 <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="#home">Navbar</Navbar.Brand>
      <Nav className="me-auto">
        <Nav.Link href="#home">Home</Nav.Link>
        <Nav.Link href="#features">Features</Nav.Link>
        <Nav.Link href="#pricing">Pricing</Nav.Link>
      </Nav>
   </Navbar>

      <nav>
        <ul className="nav-links">
          <li><Link to="/bands">Browse Bands</Link></li>
          <li><Link to="/events">View Events</Link></li>
        </ul>
      </nav>

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
        <div>
          {Array.isArray(events) && events.map(event => (
            <div key={event.id} className="event-card">
              <h3 className="event-title">{event.title}</h3>
              <p className="event-details">{event.date} at <strong>{event.venue}</strong></p>
              <div className="event-links">
                <Link to={`/events/${event.id}/winners`} className="rankings">
                  🏆 View Song Rankings
                </Link>
              </div>
              {isAuthenticated && (
                <div className="event-links">
                  <Link to={`/events/${event.id}/vote`} className="vote">
                    🎤 Vote for Songs
                  </Link>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>

           </>
  );
};

export default Home;

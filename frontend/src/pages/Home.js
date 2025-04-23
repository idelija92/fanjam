import React, { use, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Home = () => {
  const auth = useContext(AuthContext);

  return (
    <div>
      <h1>Welcome to FanJam 🎸🎷🎧🎶</h1>
      <ul>
        <li><Link to="/bands">Browse Bands</Link> — <Link to="/bands/create">Add New Band</Link></li>
        <li><Link to="/events">View Events</Link> — <Link to="/events/create">Add New Event</Link></li>
        {auth?.isAuthenticated && (
          <>
            <li><Link to="/users">User List</Link> — <Link to="/users/create">Add New User</Link></li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Home;
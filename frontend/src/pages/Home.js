import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1>Welcome to FanJam 🎸</h1>
      <ul>
        <li><Link to="/bands">Browse Bands</Link></li>
        <li><Link to="/events">View Events</Link></li>
        <li><Link to="/users">User List</Link></li>
      </ul>
    </div>
  );
};

export default Home;
import React, { useEffect, useState } from 'react';
import API from '../services/api';
import { Link } from 'react-router-dom';

const Bands = () => {
  const [bands, setBands] = useState([]);

  useEffect(() => {
    API.get('/bands').then(res => setBands(res.data));
  }, []);

  return (
    <div>
      <h1>Bands</h1>
      <Link to="/">← Back to Home</Link>
      <ul>
        {bands.map(band => (
          <li key={band.id}>{band.name} ({band.genre}) - {band.description}</li>
        ))}
      </ul>
    </div>
  );
};

export default Bands;

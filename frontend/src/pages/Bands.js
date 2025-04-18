import React, { useEffect, useState } from 'react';
import API from '../services/api';
import { Link, useNavigate } from 'react-router-dom';

const Bands = () => {
  const [bands, setBands] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    API.get('/bands').then(res => setBands(res.data));
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this band?')) return;
    try {
      await API.delete(`/bands/${id}`);
      setBands(bands.filter(b => b.id !== id));
    } catch (err) {
      console.error('Delete failed', err);
    }
  };

  return (
    <div>
      <h1>Bands</h1>
      <Link to="/">← Back to Home</Link>
      <ul>
        {bands.map(band => (
          <li key={band.id}>{band.name} ({band.genre}) - {band.description}  {' '}
          <Link to={`/bands/edit/${band.id}`}>[Edit]</Link> {' '}
          <button onClick={() => handleDelete(band.id)}>Delete</button></li>
        ))}
      </ul>
    </div>
  );
};

export default Bands;

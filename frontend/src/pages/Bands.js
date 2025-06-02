import React, { useEffect, useState } from 'react';
import API from '../services/api';
import { Link } from 'react-router-dom';
import useRole from '../hooks/useRole';
import BandCard from '../components/BandCard';
import './styles/Bands.css';

const Bands = () => {
  const [bands, setBands] = useState([]);
  const { isAdmin } = useRole();

  useEffect(() => {
    API.get('/bands').then(res => setBands(res.data));
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this band?')) return;
    try {
      await API.delete(`/bands/${id}`);
      setBands(bands.filter(b => b.id !== id));
    } catch (err) {
      console.error('Delete failed:', err);
      if (err.response?.status === 409 || err.response?.status === 500) {
        alert('Cannot delete this band. It is linked to one or more events.');
      } else {
        alert('Failed to delete band.');
      }
    }
  };

  return (
    <div className="bands-container">
      <h1 className="bands-title">Bands</h1>
      <Link to="/">← Back to Home</Link>

      <ul className="bands-list">
        {bands.map(band => (
          <BandCard
            key={band.id}
            band={band}
            showManager
            showActions={isAdmin()}
            onDelete={handleDelete}
          />
        ))}
      </ul>
    </div>
  );
};

export default Bands;

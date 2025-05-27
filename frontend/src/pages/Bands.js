import React, { useEffect, useState, useContext } from 'react';
import API from '../services/api';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import "./styles/Bands.css";

const Bands = () => {
  const [bands, setBands] = useState([]);
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const isAdmin = auth?.roles?.includes('ADMIN');

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
          <li key={band.id} className="bands-item">
            <div className="bands-name">{band.name}</div>
            <div className="bands-meta">{band.genre}</div>
            <div className="bands-meta">{band.description}</div>
            {isAdmin && (
              <div className="bands-actions">
                <Link to={`/bands/edit/${band.id}`}>Edit</Link>
                <button onClick={() => handleDelete(band.id)}>Delete</button>
              </div>
            )}

          </li>
        ))}
      </ul>
    </div>
  );
};

export default Bands;

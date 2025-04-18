import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import API from '../services/api';

const EditEvent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: '',
    date: '',
    time: '',
    venue: '',
    description: '',
    bands: [],
  });
  const [allBands, setAllBands] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    API.get(`/events/${id}`).then(res => {
      setForm({ ...res.data, bands: res.data.bands.map(b => ({ id: b.id })) });
    });
    API.get('/bands').then(res => setAllBands(res.data));
  }, [id]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleBandSelection = e => {
    const selected = Array.from(e.target.selectedOptions).map(option => ({
      id: Number(option.value),
    }));
    setForm({ ...form, bands: selected });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await API.put(`/events/${id}`, form);
      navigate('/events');
    } catch (err) {
      console.error(err);
      setError('Failed to update event');
    }
  };

  return (
    <div>
      <h1>Edit Event</h1>
      <Link to="/events">← Back to Events</Link>
      <form onSubmit={handleSubmit}>
        <input name="title" value={form.title} onChange={handleChange} placeholder="Title" /><br />
        <input type="date" name="date" value={form.date} onChange={handleChange} /><br />
        <input type="time" name="time" value={form.time} onChange={handleChange} /><br />
        <input name="venue" value={form.venue} onChange={handleChange} placeholder="Venue" /><br />
        <input name="description" value={form.description} onChange={handleChange} placeholder="Description" /><br />
        <label>Select Bands:</label><br />
        <select multiple value={form.bands.map(b => b.id)} onChange={handleBandSelection}>
          {allBands.map(b => (
            <option key={b.id} value={b.id}>{b.name}</option>
          ))}
        </select><br />
        <button type="submit">Update</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default EditEvent;

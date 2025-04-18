import React, { useState, useEffect } from 'react';
import API from '../services/api';
import { Link } from 'react-router-dom';

const CreateEvent = () => {
  const [form, setForm] = useState({ title: '', date: '', time: '', venue: '', description: '', bands: [] });
  const [allBands, setAllBands] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    API.get('/bands').then(res => setAllBands(res.data));
  }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleBandSelection = e => {
    const selected = Array.from(e.target.selectedOptions).map(option => ({ id: Number(option.value) }));
    setForm({ ...form, bands: selected });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await API.post('/events', form);
      setForm({ title: '', date: '', time: '', venue: '', description: '', bands: [] });
      setError('');
      alert('Event created!');
    } catch (err) {
      console.error(err);
      setError('Failed to create event');
    }
  };

  return (
    <div>
      <h1>Create Event</h1>
      <Link to="/events">← Back to Events</Link>
      <form onSubmit={handleSubmit}>
        <input name="title" placeholder="Title" onChange={handleChange} value={form.title} /><br />
        <input name="date" type="date" onChange={handleChange} value={form.date} /><br />
        <input name="time" type="time" onChange={handleChange} value={form.time} /><br />
        <input name="venue" placeholder="Venue" onChange={handleChange} value={form.venue} /><br />
        <input name="description" placeholder="Description" onChange={handleChange} value={form.description} /><br />
        <label>Select Bands:</label><br />
        <select multiple onChange={handleBandSelection}>
          {allBands.map(band => (
            <option key={band.id} value={band.id}>{band.name}</option>
          ))}
        </select><br />
        <button type="submit">Create</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default CreateEvent;

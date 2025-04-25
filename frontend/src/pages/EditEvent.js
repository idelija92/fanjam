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
    location: '',
    description: '',
    type: 'FREE',
    bands: [],
    setlist: '',
  });

  const [allBands, setAllBands] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    API.get(`/events/${id}`).then(res => {
      setForm({
        ...res.data,
        bands: res.data.bands.map(b => ({ id: b.id })),
        setlist: res.data.setlist ? res.data.setlist.join('\n') : '',
      });
    });
    API.get('/bands').then(res => setAllBands(res.data));
  }, [id]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleBandSelection = e => {
    const selected = Array.from(e.target.selectedOptions).map(option => ({
      id: Number(option.value),
    }));
    setForm({ ...form, bands: selected });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await API.put(`/events/${id}`, {
        ...form,
        setlist: form.setlist.split('\n').filter(song => song.trim() !== ''),
      });
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
        <input name="location" value={form.location} onChange={handleChange} placeholder="Location" /><br />
        <input name="description" value={form.description} onChange={handleChange} placeholder="Description" /><br />
        <label>Event Type:</label><br />
        <select name="type" value={form.type} onChange={handleChange}>
          <option value="FREE">Free</option>
          <option value="PAID">Paid</option>
        </select><br />
        <label>Select Bands:</label><br />
        <select multiple value={form.bands.map(b => b.id)} onChange={handleBandSelection}>
          {allBands.map(b => (
            <option key={b.id} value={b.id}>{b.name}</option>
          ))}
        </select><br />
        <label>Setlist (one song per line):</label><br />
        <textarea
          name="setlist"
          rows="5"
          value={form.setlist}
          onChange={handleChange}
          placeholder="Enter song titles"
        /><br />
        <button type="submit">Update</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default EditEvent;

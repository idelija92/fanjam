import React, { useState, useEffect } from 'react';
import API from '../services/api';
import { Link } from 'react-router-dom';
import FormWrapper from '../components/form/FormWrapper';
import FormInput from '../components/form/FormInput';
import FormButton from '../components/form/FormButton';

const CreateEvent = () => {
  const [form, setForm] = useState({
    title: '', date: '', time: '', venue: '', location: '', description: '', type: 'FREE', bands: []
  });
  const [allBands, setAllBands] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    API.get('/bands').then(res => setAllBands(res.data));
  }, []);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleBandSelection = e => {
    const selected = Array.from(e.target.selectedOptions).map(option => ({ id: Number(option.value) }));
    setForm({ ...form, bands: selected });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await API.post('/events', form);
      setError('');
      alert('Event created!');
    } catch (err) {
      console.error(err);
      setError('Failed to create event');
    }
  };

  return (
    <FormWrapper title="Create Event">
      <p><Link to="/events">← Back to Events</Link></p>
      <form onSubmit={handleSubmit}>
        <FormInput name="title" placeholder="Title" value={form.title} onChange={handleChange} />
        <FormInput name="date" type="date" value={form.date} onChange={handleChange} />
        <FormInput name="time" type="time" value={form.time} onChange={handleChange} />
        <FormInput name="location" placeholder="Location" value={form.location} onChange={handleChange} />
        <FormInput name="venue" placeholder="Venue" value={form.venue} onChange={handleChange} />
        <FormInput name="description" placeholder="Description" value={form.description} onChange={handleChange} />

        <label>Event Type:</label>
        <select name="type" value={form.type} onChange={handleChange}>
          <option value="FREE">Free</option>
          <option value="PAID">Paid</option>
        </select><br />

        <label>Select Bands:</label><br />
        <select multiple onChange={handleBandSelection} style={{ width: '100%', marginBottom: '1rem' }}>
          {allBands.map(band => (
            <option key={band.id} value={band.id}>{band.name}</option>
          ))}
        </select>

        <FormButton type="submit">Create</FormButton>
      </form>
      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
    </FormWrapper>
  );
};

export default CreateEvent;

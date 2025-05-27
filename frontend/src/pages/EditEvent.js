import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import API from '../services/api';
import FormWrapper from '../components/form/FormWrapper';
import FormInput from '../components/form/FormInput';
import FormButton from '../components/form/FormButton';
import '../components/form/form.css';

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
    const selected = Array.from(e.target.selectedOptions).map(option => ({ id: Number(option.value) }));
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
    <FormWrapper title="Edit Event">
      <p><Link to="/events">← Back to Events</Link></p>
      <form onSubmit={handleSubmit}>
        <FormInput name="title" value={form.title} onChange={handleChange} placeholder="Title" />
        <FormInput name="date" type="date" value={form.date} onChange={handleChange} />
        <FormInput name="time" type="time" value={form.time} onChange={handleChange} />
        <FormInput name="venue" value={form.venue} onChange={handleChange} placeholder="Venue" />
        <FormInput name="location" value={form.location} onChange={handleChange} placeholder="Location" />
        <FormInput name="description" value={form.description} onChange={handleChange} placeholder="Description" />

        <label>Event Type:</label>
        <select className="form-select" name="type" value={form.type} onChange={handleChange}>
          <option value="FREE">Free</option>
          <option value="PAID">Paid</option>
        </select>

        <label>Select Bands:</label>
        <select className="form-select" multiple value={form.bands.map(b => b.id)} onChange={handleBandSelection}>
          {allBands.map(b => (
            <option key={b.id} value={b.id}>{b.name}</option>
          ))}
        </select>

        <label>Setlist (one song per line):</label>
        <textarea
          name="setlist"
          className="form-textarea"
          rows="5"
          value={form.setlist}
          onChange={handleChange}
          placeholder="Enter song titles"
        />

        <FormButton type="submit">Update</FormButton>
      </form>
      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
    </FormWrapper>
  );
};

export default EditEvent;
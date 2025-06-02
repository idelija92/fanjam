import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import API from '../services/api';
import FormWrapper from '../components/form/FormWrapper';
import FormInput from '../components/form/FormInput';
import FormButton from '../components/form/FormButton';
import '../components/form/form.css';
import { AuthContext } from '../context/AuthContext';
import useRole from '../hooks/useRole';

const EditEvent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);
  const { isAdmin, isVenue } = useRole();

  const [form, setForm] = useState({
    title: '', date: '', time: '', venue: '', location: '', description: '', type: 'FREE', bands: []
  });
  const [allBands, setAllBands] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isAdmin && !isVenue) {
      navigate('/events');
      return;
    }

    const fetchData = async () => {
      try {
        const [eventRes, bandsRes] = await Promise.all([
          API.get(`/events/${id}`),
          API.get('/bands')
        ]);

        const eventData = eventRes.data;
        setForm({
          ...eventData,
          bands: Array.isArray(eventData.bands) ? eventData.bands.map(b => ({ id: b.id })) : []
        });

        setAllBands(bandsRes.data);
      } catch (err) {
        console.error('Failed to load data:', err);
        setError('Failed to load event or bands');
      }
    };

    fetchData();
  }, [id, isAdmin, isVenue, navigate]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleBandSelection = e => {
    const selected = Array.from(e.target.selectedOptions).map(option => ({ id: Number(option.value) }));
    setForm({ ...form, bands: selected });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await API.put(`/events/${id}`, form);
      navigate(isVenue ? '/venue/dashboard' : '/events');
    } catch (err) {
      console.error(err);
      setError('Failed to update event');
    }
  };

  return (
    <FormWrapper title="Edit Event">
      <p><Link to="/events">← Back to Events</Link></p>
      <form onSubmit={handleSubmit}>
        <FormInput name="title" value={form.title || ''} onChange={handleChange} placeholder="Title" />
        <FormInput name="date" type="date" value={form.date || ''} onChange={handleChange} />
        <FormInput name="time" type="time" value={form.time || ''} onChange={handleChange} />
        <FormInput name="venue" value={form.venue || ''} onChange={handleChange} placeholder="Venue" />
        <FormInput name="location" value={form.location || ''} onChange={handleChange} placeholder="Location" />
        <FormInput name="description" value={form.description || ''} onChange={handleChange} placeholder="Description" />

        <label>Event Type:</label>
        <select className="form-select" name="type" value={form.type || 'FREE'} onChange={handleChange}>
          <option value="FREE">Free</option>
          <option value="PAID">Paid</option>
        </select>

        <label>Select Bands:</label>
        <select
          className="form-select"
          multiple
          value={form.bands.map(b => b.id)}
          onChange={handleBandSelection}
        >
          {allBands.map(b => (
            <option key={b.id} value={b.id}>{b.name}</option>
          ))}
        </select>

        <FormButton type="submit">Update</FormButton>
      </form>
      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
    </FormWrapper>
  );
};

export default EditEvent;

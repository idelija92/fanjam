import React, { useState, useEffect } from 'react';
import API from '../services/api';
import { Link } from 'react-router-dom';
import FormWrapper from '../components/form/FormWrapper';
import FormInput from '../components/form/FormInput';
import FormButton from '../components/form/FormButton';
import "./styles/Forms.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Navbar, Nav, Container,Carousel } from 'react-bootstrap';

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
  <div className="container mt-5">
    <div className="card shadow-sm">
      <div className="card-header bg-primary text-white">
        <h5 className="mb-0">Create Event</h5>
      </div>
      <div className="card-body">
        <p>
          <Link to="/events" className="btn btn-secondary btn-sm mb-3">← Back to Events</Link>
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <FormInput name="title" placeholder="Title" value={form.title} onChange={handleChange} className="form-control" />
          </div>

          <div className="mb-3">
            <label htmlFor="date" className="form-label">Date</label>
            <FormInput name="date" type="date" value={form.date} onChange={handleChange} className="form-control" />
          </div>

          <div className="mb-3">
            <label htmlFor="time" className="form-label">Time</label>
            <FormInput name="time" type="time" value={form.time} onChange={handleChange} className="form-control" />
          </div>

          <div className="mb-3">
            <label htmlFor="location" className="form-label">Location</label>
            <FormInput name="location" placeholder="Location" value={form.location} onChange={handleChange} className="form-control" />
          </div>

          <div className="mb-3">
            <label htmlFor="venue" className="form-label">Venue</label>
            <FormInput name="venue" placeholder="Venue" value={form.venue} onChange={handleChange} className="form-control" />
          </div>

          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <FormInput name="description" placeholder="Description" value={form.description} onChange={handleChange} className="form-control" />
          </div>

          <div className="mb-3">
            <label htmlFor="type" className="form-label">Event Type</label>
            <select name="type" value={form.type} onChange={handleChange} className="form-select">
              <option value="FREE">Free</option>
              <option value="PAID">Paid</option>
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="bands" className="form-label">Select Bands</label>
            <select name="bands" multiple onChange={handleBandSelection} className="form-select" style={{ height: 'auto' }}>
              {allBands.map(band => (
                <option key={band.id} value={band.id}>{band.name}</option>
              ))}
            </select>
          </div>

          <FormButton type="submit" className="btn btn-success">Create</FormButton>
        </form>

        {error && <p className="text-danger text-center mt-3">{error}</p>}
      </div>
    </div>
  </div>
</FormWrapper>
  );
};

export default CreateEvent;

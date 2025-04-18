import React, { useState } from 'react';
import API from '../services/api';
import { Link } from 'react-router-dom';

const CreateBand = () => {
  const [form, setForm] = useState({ name: '', genre: '', description: '' });
  const [error, setError] = useState('');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await API.post('/bands', form);
      setForm({ name: '', genre: '', description: '' });
      setError('');
      alert('Band created!');
    } catch (err) {
      console.error(err);
      setError('Failed to create band');
    }
  };

  return (
    <div>
      <h1>Create Band</h1>
      <Link to="/bands">← Back to Bands</Link>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" onChange={handleChange} value={form.name} /><br />
        <input name="genre" placeholder="Genre" onChange={handleChange} value={form.genre} /><br />
        <input name="description" placeholder="Description" onChange={handleChange} value={form.description} /><br />
        <button type="submit">Create</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default CreateBand;

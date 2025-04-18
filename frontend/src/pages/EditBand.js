import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import API from '../services/api';

const EditBand = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', genre: '', description: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    API.get(`/bands/${id}`).then(res => setForm(res.data)).catch(() => setError('Failed to load band'));
  }, [id]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await API.put(`/bands/${id}`, form);
      navigate('/bands');
    } catch (err) {
      console.error(err);
      setError('Failed to update band');
    }
  };

  return (
    <div>
      <h1>Edit Band</h1>
      <Link to="/bands">← Back to Bands</Link>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} /><br />
        <input name="genre" placeholder="Genre" value={form.genre} onChange={handleChange} /><br />
        <input name="description" placeholder="Description" value={form.description} onChange={handleChange} /><br />
        <button type="submit">Update</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default EditBand;

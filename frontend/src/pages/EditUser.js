import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import API from '../services/api';

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    API.get(`/users/${id}`)
      .then(res => {
        setForm({ ...res.data, password: '' });
      })
      .catch(() => setError('Failed to load user'));
  }, [id]);


  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const dataToSend = { username: form.username, email: form.email };
      if (form.password.trim() !== '') {
        dataToSend.password = form.password;
      }
      await API.put(`/users/${id}`, dataToSend);
      navigate('/users');
    } catch (err) {
      console.error(err);
      setError('Failed to update user');
    }
  };


  return (
    <div>
      <h1>Edit User</h1>
      <Link to="/users">← Back to Users</Link>
      <form onSubmit={handleSubmit}>
        <input name="username" value={form.username} onChange={handleChange} placeholder="Username" /><br />
        <input name="email" value={form.email} onChange={handleChange} placeholder="Email" /><br />
        <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="Password" /><br />
        <button type="submit">Update</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default EditUser;

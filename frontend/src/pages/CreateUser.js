import React, { useState } from 'react';
import API from '../services/api';
import { Link } from 'react-router-dom';

const CreateUser = () => {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await API.post('/users', form);
      setForm({ username: '', email: '', password: '' });
      setError('');
      alert('User created!');
    } catch (err) {
      console.error(err);
      setError('Failed to create user');
    }
  };

  return (
    <div>
      <h1>Create User</h1>
      <Link to="/users">← Back to Users</Link>
      <form onSubmit={handleSubmit}>
        <input name="username" placeholder="Username" onChange={handleChange} value={form.username} /><br />
        <input name="email" placeholder="Email" onChange={handleChange} value={form.email} /><br />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} value={form.password} /><br />
        <button type="submit">Create</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default CreateUser;

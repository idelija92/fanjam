import React, { useState } from 'react';
import API from '../services/api';
import { Link } from 'react-router-dom';

const ALL_ROLES = ['USER', 'ADMIN', 'BAND', 'VENUE'];

const CreateUser = () => {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    roles: ['USER']
  });
  const [error, setError] = useState('');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRoleChange = e => {
    const selected = Array.from(e.target.selectedOptions).map(option => option.value);
    setForm({ ...form, roles: selected });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await API.post('/users', form);
      setForm({ username: '', email: '', password: '', roles: ['USER'] });
      setError('');
      alert('User created!');
    } catch (err) {
      console.error(err);
      setError('Failed to create user');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '2rem auto', padding: '1rem', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h1 style={{ textAlign: 'center' }}>Create User</h1>
      <p><Link to="/users">← Back to Users</Link></p>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <input
          name="username"
          placeholder="Username"
          onChange={handleChange}
          value={form.username}
          style={{ padding: '0.5rem' }}
        />
        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
          value={form.email}
          style={{ padding: '0.5rem' }}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          value={form.password}
          style={{ padding: '0.5rem' }}
        />

        <label>Roles (Ctrl/Cmd + Click to select multiple):</label>
        <select
          multiple
          onChange={handleRoleChange}
          value={form.roles}
          style={{ padding: '0.5rem', height: '6rem' }}
        >
          {ALL_ROLES.map(role => (
            <option key={role} value={role}>{role}</option>
          ))}
        </select>

        <button type="submit" style={{ padding: '0.6rem', background: '#007bff', color: 'white', border: 'none', borderRadius: '4px' }}>
          Create
        </button>

        {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
      </form>
    </div>
  );
};

export default CreateUser;

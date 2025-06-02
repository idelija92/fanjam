import React, { useState } from 'react';
import API from '../services/api';
import { Link } from 'react-router-dom';
import FormWrapper from '../components/form/FormWrapper';
import FormInput from '../components/form/FormInput';
import FormButton from '../components/form/FormButton';

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
    <FormWrapper title="Create User">
      <p><Link to="/users">← Back to Users</Link></p>
      <form onSubmit={handleSubmit}>
        <FormInput name="username" placeholder="Username" value={form.username} onChange={handleChange} />
        <FormInput name="email" placeholder="Email" value={form.email} onChange={handleChange} />
        <FormInput type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} />

        <label>Roles:</label>
        <select multiple onChange={handleRoleChange} value={form.roles}>
          {ALL_ROLES.map(role => (
            <option key={role} value={role}>{role}</option>
          ))}
        </select>

        <FormButton type="submit">Create</FormButton>
        {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
      </form>
    </FormWrapper>
  );
};

export default CreateUser;
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
  <div className="container mt-5">
    <div className="card shadow-sm">
      <div className="card-header bg-primary text-white">
        <h5 className="mb-0">Create User</h5>
      </div>
      <div className="card-body">
        <p>
          <Link to="/users" className="btn btn-secondary btn-sm mb-3">← Back to Users</Link>
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <FormInput name="username" placeholder="Username" value={form.username} onChange={handleChange} className="form-control" />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <FormInput name="email" placeholder="Email" value={form.email} onChange={handleChange} className="form-control" />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <FormInput type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} className="form-control" />
          </div>

          <div className="mb-3">
            <label htmlFor="roles" className="form-label">Roles</label>
            <select multiple onChange={handleRoleChange} value={form.roles} className="form-select" style={{ height: 'auto' }}>
              {ALL_ROLES.map(role => (
                <option key={role} value={role}>{role}</option>
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

export default CreateUser;
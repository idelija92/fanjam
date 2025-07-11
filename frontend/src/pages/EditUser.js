import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import API from '../services/api';
import FormWrapper from '../components/form/FormWrapper';
import FormInput from '../components/form/FormInput';
import FormButton from '../components/form/FormButton';


const ALL_ROLES = ['USER', 'ADMIN', 'BAND', 'VENUE'];

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', email: '', password: '', roles: [] });
  const [error, setError] = useState('');

  useEffect(() => {
    API.get(`/users/${id}`)
      .then(res => {
        setForm({ ...res.data, password: '' });
      })
      .catch(() => setError('Failed to load user'));
  }, [id]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleRoleChange = e => {
    const selected = Array.from(e.target.selectedOptions).map(option => option.value);
    setForm({ ...form, roles: selected });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const dataToSend = { username: form.username, email: form.email, roles: form.roles };
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
    <FormWrapper title="Edit User">
      <p><Link to="/users">← Back to Users</Link></p>
      <form onSubmit={handleSubmit}>
        <FormInput name="username" value={form.username} onChange={handleChange} placeholder="Username" />
        <FormInput name="email" value={form.email} onChange={handleChange} placeholder="Email" />
        <FormInput type="password" name="password" value={form.password} onChange={handleChange} placeholder="Password" />

        <label>Roles:</label>
        <select multiple value={form.roles} onChange={handleRoleChange}>
          {ALL_ROLES.map(role => (
            <option key={role} value={role}>{role}</option>
          ))}
        </select>
        
        <FormButton type="submit">Update</FormButton>
      </form>
      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
    </FormWrapper>
  );
};

export default EditUser;
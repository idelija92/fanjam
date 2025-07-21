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
  <div className="container mt-5">
    <div className="card shadow-sm">
      <div className="card-header bg-primary text-white">
        <h5 className="mb-0">Edit User</h5>
      </div>
      <div className="card-body">
        <p>
          <Link to="/users" className="btn btn-secondary btn-sm mb-3">← Back to Users</Link>
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <FormInput name="username" value={form.username} onChange={handleChange} placeholder="Username" className="form-control" />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <FormInput name="email" value={form.email} onChange={handleChange} placeholder="Email" className="form-control" />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <FormInput type="password" name="password" value={form.password} onChange={handleChange} placeholder="Password" className="form-control" />
          </div>

          <div className="mb-3">
            <label htmlFor="roles" className="form-label">Roles</label>
            <select multiple value={form.roles} onChange={handleRoleChange} className="form-select" style={{ height: 'auto' }}>
              {ALL_ROLES.map(role => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>
          </div>

          <FormButton type="submit" className="btn btn-success">Update</FormButton>
        </form>

        {error && <p className="text-danger text-center mt-3">{error}</p>}
      </div>
    </div>
  </div>
</FormWrapper>

  );
};

export default EditUser;
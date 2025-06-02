import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import API from '../services/api';
import FormWrapper from '../components/form/FormWrapper';
import FormInput from '../components/form/FormInput';
import FormButton from '../components/form/FormButton';
import useRole from '../hooks/useRole';

const EditBand = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', genre: '', description: '', managerId: '' });
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  const { isAdmin } = useRole();
  if (!isAdmin) return <p>Access denied</p>;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [bandRes, usersRes] = await Promise.all([
          API.get(`/bands/${id}`),
          API.get('/users')
        ]);

        const band = bandRes.data;
        setForm({
          name: band.name,
          genre: band.genre,
          description: band.description,
          managerId: band.manager?.id || ''
        });

        const bandRoleUsers = usersRes.data.filter(user =>
          user.roles?.includes('BAND')
        );
        setUsers(bandRoleUsers);
      } catch (err) {
        console.error('Failed to load band or users', err);
        setError('Failed to load band or users');
      }
    };

    fetchData();
  }, [id]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const payload = {
        name: form.name,
        genre: form.genre,
        description: form.description,
        manager: { id: Number(form.managerId) }
      };
      await API.put(`/bands/${id}`, payload);
      navigate('/bands');
    } catch (err) {
      console.error(err);
      setError('Failed to update band');
    }
  };

  return (
    <FormWrapper title="Edit Band">
      <p><Link to="/bands">← Back to Bands</Link></p>
      <form onSubmit={handleSubmit}>
        <FormInput name="name" value={form.name} onChange={handleChange} placeholder="Name" />
        <FormInput name="genre" value={form.genre} onChange={handleChange} placeholder="Genre" />
        <FormInput name="description" value={form.description} onChange={handleChange} placeholder="Description" />

        <label>Assign Manager:</label>
        <select name="managerId" value={form.managerId} onChange={handleChange} required>
          <option value="">-- Select a Manager --</option>
          {users.map(user => (
            <option key={user.id} value={user.id}>{user.email}</option>
          ))}
        </select>

        <FormButton type="submit">Update</FormButton>
      </form>
      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
    </FormWrapper>
  );
};

export default EditBand;

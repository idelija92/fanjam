import React, { useState, useEffect } from 'react';
import API from '../services/api';
import { Link } from 'react-router-dom';
import FormWrapper from '../components/form/FormWrapper';
import FormInput from '../components/form/FormInput';
import FormButton from '../components/form/FormButton';

const CreateBand = () => {
  const [form, setForm] = useState({
    name: '',
    genre: '',
    description: '',
    managerId: ''
  });
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    API.get('/users')
      .then(res => setUsers(res.data))
      .catch(err => console.error('Failed to fetch users', err));
  }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const payload = {
        name: form.name,
        genre: form.genre,
        description: form.description,
        manager: {
          id: Number(form.managerId)
        }
      };
      await API.post('/bands', payload);
      alert('Band created!');
      setForm({ name: '', genre: '', description: '', managerId: '' });
    } catch (err) {
      console.error(err);
      setError('Failed to create band');
    }
  };

  return (
    <FormWrapper title="Create Band">
      <p><Link to="/bands">← Back to Bands</Link></p>
      <form onSubmit={handleSubmit}>
        <FormInput name="name" placeholder="Name" value={form.name} onChange={handleChange} />
        <FormInput name="genre" placeholder="Genre" value={form.genre} onChange={handleChange} />
        <FormInput name="description" placeholder="Description" value={form.description} onChange={handleChange} />

        <label>Assign Manager:</label>
        <select name="managerId" value={form.managerId} onChange={handleChange} required>
          <option value="">-- Select a Manager --</option>
          {users.map(user => (
            <option key={user.id} value={user.id}>{user.email}</option>
          ))}
        </select>

        <FormButton type="submit">Create</FormButton>
      </form>
      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
    </FormWrapper>
  );
};

export default CreateBand;

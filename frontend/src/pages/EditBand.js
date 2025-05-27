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
  const [form, setForm] = useState({ name: '', genre: '', description: '' });
  const [error, setError] = useState('');

  const { isAdmin } = useRole();
  if (!isAdmin) return <p>Access denied</p>;

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
    <FormWrapper title="Edit Band">
      <p><Link to="/bands">← Back to Bands</Link></p>
      <form onSubmit={handleSubmit}>
        <FormInput name="name" value={form.name} onChange={handleChange} placeholder="Name" />
        <FormInput name="genre" value={form.genre} onChange={handleChange} placeholder="Genre" />
        <FormInput name="description" value={form.description} onChange={handleChange} placeholder="Description" />
        <FormButton type="submit">Update</FormButton>
      </form>
      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
    </FormWrapper>
  );
};

export default EditBand;
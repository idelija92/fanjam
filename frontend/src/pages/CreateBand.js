import React, { useState } from 'react';
import API from '../services/api';
import { Link } from 'react-router-dom';
import FormWrapper from '../components/form/FormWrapper';
import FormInput from '../components/form/FormInput';
import FormButton from '../components/form/FormButton';

const CreateBand = () => {
  const [form, setForm] = useState({ name: '', genre: '', description: '' });
  const [error, setError] = useState('');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await API.post('/bands', form);
      setForm({ name: '', genre: '', description: '' });
      setError('');
      alert('Band created!');
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
        <FormButton type="submit">Create</FormButton>
      </form>
      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
    </FormWrapper>
  );
};

export default CreateBand;
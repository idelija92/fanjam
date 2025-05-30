import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import API from '../services/api';
import FormWrapper from '../components/form/FormWrapper';
import FormButton from '../components/form/FormButton';

const EditSetlist = () => {
  const { id } = useParams();
  const [setlist, setSetlist] = useState('');
  const [customSlots, setCustomSlots] = useState(0);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    API.get(`/events/${id}`)
      .then(res => {
        setSetlist(res.data.setlist?.join('\n') || '');
      })
      .catch(err => {
        console.error('Failed to fetch event', err);
        setError('Unable to load event data.');
      });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const songs = setlist.split('\n').map(s => s.trim()).filter(Boolean);
    const combinedSetlist = [...songs, ...Array.from({ length: customSlots }, () => 'CUSTOM_SLOT')];

    try {
      await API.put(`/events/${id}`, { setlist: combinedSetlist });
      alert('Setlist updated!');
      navigate('/band-dashboard');
    } catch (err) {
      console.error('Update failed', err);
      setError('Failed to update setlist.');
    }
  };

  return (
    <FormWrapper title="Edit Setlist">
      <p><Link to="/band-dashboard">← Back to Dashboard</Link></p>
      <form onSubmit={handleSubmit}>
        <label>Setlist (one song per line):</label>
        <textarea
          rows="10"
          value={setlist}
          onChange={(e) => setSetlist(e.target.value)}
          style={{ width: '100%', marginBottom: '1rem' }}
        />

        <label>Number of Custom Song Slots:</label>
        <input
          type="number"
          min="0"
          value={customSlots}
          onChange={(e) => setCustomSlots(Number(e.target.value))}
          style={{ width: '100%', marginBottom: '1rem' }}
        />

        <FormButton type="submit">Save Setlist</FormButton>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </FormWrapper>
  );
};

export default EditSetlist;

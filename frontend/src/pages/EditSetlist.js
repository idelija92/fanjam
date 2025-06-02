// ✅ UPDATED EditSetlist.js with add/remove song UI

import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import API from '../services/api';
import FormWrapper from '../components/form/FormWrapper';
import FormButton from '../components/form/FormButton';

const EditSetlist = () => {
    const { eventId } = useParams();
    const [songs, setSongs] = useState([]);
    const [customSlots, setCustomSlots] = useState(0);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        console.log("Editing setlist for event ID:", eventId);
        API.get(`/events/${eventId}/my-setlist`)
            .then(res => {
                setSongs(res.data.setlist || []);
                setCustomSlots(res.data.customSongSlots || 0);
            })
            .catch(err => {
                console.error('Failed to fetch setlist', err);
                setError('Unable to load your setlist.');
            });
    }, [eventId]);

    const updateSong = (index, newValue) => {
        const updated = [...songs];
        updated[index] = newValue;
        setSongs(updated);
    };

    const removeSong = (index) => {
        setSongs(songs.filter((_, i) => i !== index));
    };

    const addSong = () => {
        setSongs([...songs, ""]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const cleaned = songs.map(s => s.trim()).filter(Boolean);

        try {
            await API.put(`/events/${eventId}/setlist`, {
                setlist: cleaned,
                customSongSlots: customSlots,
            });
            alert('Setlist updated!');
            navigate('/band/dashboard');
        } catch (err) {
            console.error('Update failed', err);
            setError('Failed to update setlist.');
        }
    };

    return (
        <FormWrapper title="Edit Setlist">
            <p><Link to="/band/dashboard">←Back to Dashboard</Link></p>

            <form onSubmit={handleSubmit}>
                <label>Setlist:</label>
                {songs.map((song, index) => (
                    <div key={index} style={{ display: 'flex', marginBottom: '0.5rem' }}>
                        <input
                            type="text"
                            value={song}
                            onChange={(e) => updateSong(index, e.target.value)}
                            style={{ flexGrow: 1 }}
                        />
                        <button type="button" onClick={() => removeSong(index)} style={{ marginLeft: '0.5rem' }}>
                            ❌
                        </button>
                    </div>
                ))}
                <button type="button" onClick={addSong}>➕ Add Song</button>

                <label style={{ marginTop: '1rem' }}>Number of Custom Song Slots:</label>
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

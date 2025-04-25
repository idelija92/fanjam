import React, { useEffect, useState, useContext } from 'react';
import { voteForSong, unvoteForSong, getVotesForEvent } from '../api/songVotes';
import { AuthContext } from '../context/AuthContext';
import { useParams, Link } from 'react-router-dom';
import API from '../services/api';

const EventVotingPage = () => {
    const { token } = useContext(AuthContext);
    const { eventId } = useParams();

    const [songTitle, setSongTitle] = useState('');
    const [votes, setVotes] = useState([]);
    const [voteCounts, setVoteCounts] = useState({});
    const [setlist, setSetlist] = useState([]);
    const [selectedSong, setSelectedSong] = useState('');

    const fetchVotes = async () => {
        try {
            const res = await getVotesForEvent(eventId, token);
            setVotes(res.data);

            const counts = {};
            res.data.forEach(vote => {
                counts[vote.songTitle] = (counts[vote.songTitle] || 0) + 1;
            });
            setVoteCounts(counts);
        } catch (err) {
            console.error(err);
        }
    };

    const fetchSetlist = async () => {
        try {
            const res = await API.get(`/events/${eventId}`);
            setSetlist(res.data.setlist || []);
        } catch (err) {
            console.error('Failed to load event setlist', err);
        }
    };

    const handleVote = async () => {
        const titleToVote = selectedSong || songTitle;
        if (!titleToVote.trim()) {
            alert('Please select or enter a song');
            return;
        }

        try {
            await voteForSong(eventId, titleToVote, token);
            setSongTitle('');
            setSelectedSong('');
            fetchVotes();
        } catch (err) {
            alert(err.response?.data || 'Error voting');
        }
    };

    const handleUnvote = async (title) => {
        try {
            await unvoteForSong(eventId, title, token);
            fetchVotes();
        } catch (err) {
            alert(err.response?.data || 'Error unvoting');
        }
    };

    useEffect(() => {
        fetchVotes();
        fetchSetlist();
    }, [eventId]);

    return (
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <h1>Vote for Songs </h1>
            <Link to="/events">← Back to Events</Link>
            <br />
            <Link to={`/events/${eventId}/winners`} style={{ marginTop: '1rem', display: 'inline-block' }}>
                View Current Song Rankings
            </Link>

            <div style={{ marginTop: '2rem' }}>
                <h2>Choose from Setlist:</h2>
                {setlist.length > 0 ? (
                    <select
                        value={selectedSong}
                        onChange={(e) => setSelectedSong(e.target.value)}
                        style={{ padding: '0.5rem', marginBottom: '1rem' }}
                    >
                        <option value="">-- Select a song --</option>
                        {setlist.map((song, index) => (
                            <option key={index} value={song}>
                                {song}
                            </option>
                        ))}
                    </select>
                ) : (
                    <p>No setlist available for this event</p>
                )}
            </div>

            <div style={{ marginTop: '1.5rem' }}>
                <h2>Or Request a Song:</h2>
                <input
                    type="text"
                    placeholder="Enter song title..."
                    value={songTitle}
                    onChange={(e) => setSongTitle(e.target.value)}
                    style={{ padding: '0.5rem', width: '250px' }}
                />
            </div>

            <div style={{ marginTop: '1.5rem' }}>
                <button onClick={handleVote} style={{ padding: '0.7rem 1.5rem' }}>
                    Vote
                </button>
            </div>


            <h2 style={{ marginTop: '2rem' }}>Current Votes:</h2>

            {Object.keys(voteCounts).length === 0 ? (
                <p>No votes yet! Be the first to vote! </p>
            ) : (
                <ul style={{ listStyleType: 'none', padding: 0 }}>
                    {Object.entries(voteCounts).map(([title, count]) => (
                        <li key={title} style={{ marginBottom: '1rem' }}>
                            <strong>{title}</strong> — {count} vote{count > 1 ? 's' : ''}
                            <div>
                                <button onClick={() => handleUnvote(title)} style={{ marginTop: '0.5rem' }}>
                                    Unvote
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default EventVotingPage;

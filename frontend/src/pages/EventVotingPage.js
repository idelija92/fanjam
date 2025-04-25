import React, { useEffect, useState, useContext } from 'react';
import { voteForSong, unvoteForSong, getVotesForEvent } from '../api/songVotes';
import { AuthContext } from '../context/AuthContext';
import { useParams, Link } from 'react-router-dom';

const EventVotingPage = () => {
    const { token } = useContext(AuthContext);
    const { eventId } = useParams();

    const [songTitle, setSongTitle] = useState('');
    const [votes, setVotes] = useState([]);
    const [voteCounts, setVoteCounts] = useState({});

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

    const handleVote = async () => {
        try {
            await voteForSong(eventId, songTitle, token);
            setSongTitle('');
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
    }, [eventId]);

    return (
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <h1>Vote for Songs </h1>
            <Link to="/events">← Back to Events</Link>

            <div style={{ marginTop: '1.5rem' }}>
                <input
                    type="text"
                    placeholder="Enter song title..."
                    value={songTitle}
                    onChange={(e) => setSongTitle(e.target.value)}
                    style={{ padding: '0.5rem', width: '250px' }}
                />
                <button onClick={handleVote} style={{ marginLeft: '0.5rem', padding: '0.5rem' }}>
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

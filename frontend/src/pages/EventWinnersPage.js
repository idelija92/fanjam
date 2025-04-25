import React, { useEffect, useState } from 'react';
import { getVotesForEvent } from '../api/songVotes';
import { useParams, Link } from 'react-router-dom';

const EventWinnersPage = () => {
    const { eventId } = useParams();
    const [voteCounts, setVoteCounts] = useState({});

    const fetchVotes = async () => {
        try {
            const res = await getVotesForEvent(eventId);
            const counts = {};
            res.data.forEach(vote => {
                counts[vote.songTitle] = (counts[vote.songTitle] || 0) + 1;
            });
            setVoteCounts(counts);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchVotes();
    }, [eventId]);

    const sortedSongs = Object.entries(voteCounts).sort((a, b) => b[1] - a[1]);

    return (
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <h1>🎵 Event Song Rankings</h1>
            <Link to="/events">← Back to Events</Link>

            {sortedSongs.length === 0 ? (
                <p>No votes yet!</p>
            ) : (
                <ol style={{ marginTop: '2rem' }}>
                    {sortedSongs.map(([title, count], index) => (
                        <li key={title} style={{ fontSize: index === 0 ? '1.5rem' : '1.2rem', marginBottom: '1rem' }}>
                            {index === 0 && '🥇 '}
                            <strong>{title}</strong> — {count} vote{count > 1 ? 's' : ''}
                        </li>
                    ))}
                </ol>
            )}
        </div>
    );
};

export default EventWinnersPage;

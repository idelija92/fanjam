import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const EventWinnersPage = () => {
    const { eventId } = useParams();
    const [groupedVotes, setGroupedVotes] = useState([]);

    const fetchVotes = async () => {
        try {
            const res = await axios.get(`http://localhost:8080/api/song-votes/event/${eventId}`);

            // Group by songTitle, preserving full vote info
            const group = {};
            res.data.forEach(vote => {
                if (!group[vote.songTitle]) group[vote.songTitle] = [];
                group[vote.songTitle].push(vote);
            });

            // Convert to sorted array: [songTitle, voteArray]
            const sorted = Object.entries(group).sort((a, b) => b[1].length - a[1].length);
            setGroupedVotes(sorted);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchVotes();
    }, [eventId]);

    return (
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <h1>🎵 Event Song Rankings</h1>
            <Link to="/events">← Back to Events</Link>

            {groupedVotes.length === 0 ? (
                <p>No votes yet!</p>
            ) : (
                <ul style={{ listStyleType: 'none', padding: 0, marginTop: '2rem' }}>
                    {groupedVotes.map(([title, votes]) => (
                        <li key={title} style={{ marginBottom: '2rem' }}>
                            <strong>{title}</strong> — {votes.length} vote{votes.length > 1 ? 's' : ''}
                            {votes.some(v => v.customMessage) && (
                                <ul style={{
                                    fontStyle: 'italic',
                                    marginTop: '0.5rem',
                                    paddingLeft: '1rem',
                                    color: '#555',
                                    textAlign: 'left',
                                    display: 'inline-block'
                                }}>
                                    {votes
                                        .filter(v => v.customMessage)
                                        .map((v, i) => (
                                            <li key={i}>“{v.customMessage}”</li>
                                        ))}
                                </ul>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default EventWinnersPage;

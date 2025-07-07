import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import API from '../services/api';

const EventWinnersPage = () => {
    const { eventId } = useParams();
    const [votes, setVotes] = useState([]);
    const [eventData, setEventData] = useState(null);
    const [bandVoteMap, setBandVoteMap] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [voteRes, eventRes] = await Promise.all([
                    API.get(`/song-votes/event/${eventId}`),
                    API.get(`/events/${eventId}`)
                ]);

                setVotes(voteRes.data);
                setEventData(eventRes.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchData();
    }, [eventId]);

    useEffect(() => {
        if (!eventData) return;

        const voteMap = {};

        // Initialize bands
        eventData.bands.forEach(band => {
            voteMap[band.name] = [];
        });

        // Group votes
        votes.forEach(vote => {
            const band = eventData.bands.find(b => b.setlist?.includes(vote.songTitle));
            const bandName = band?.name || 'Custom Songs';
            if (!voteMap[bandName]) voteMap[bandName] = [];
            voteMap[bandName].push(vote);
        });

        setBandVoteMap(voteMap);
    }, [votes, eventData]);

    return (
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <h1>🎵 Event Song Rankings</h1>
            <Link to="/events">← Back to Events</Link>

            {!eventData ? (
                <p>Loading event...</p>
            ) : (
                Object.entries(bandVoteMap).map(([bandName, bandVotes]) => (
                    <div key={bandName} style={{ marginTop: '2rem' }}>
                        <h2>{bandName}</h2>
                        {bandVotes.length === 0 ? (
                            <p>No votes</p>
                        ) : (
                            <ul style={{ listStyleType: 'none', padding: 0 }}>
                                {Object.entries(
                                    bandVotes.reduce((acc, vote) => {
                                        acc[vote.songTitle] = acc[vote.songTitle] || [];
                                        acc[vote.songTitle].push(vote);
                                        return acc;
                                    }, {})
                                )
                                    .sort((a, b) => b[1].length - a[1].length)
                                    .map(([title, votes]) => (
                                        <li key={title} style={{ marginBottom: '1rem' }}>
                                            <strong>{title}</strong> — {votes.length} vote{votes.length > 1 ? 's' : ''}
                                            {votes.some(v => v.customMessage) && (
                                                <ul style={{ fontStyle: 'italic', color: '#555', marginTop: '0.3rem', paddingLeft: '1rem' }}>
                                                    {votes.filter(v => v.customMessage).map((v, i) => (
                                                        <li key={i}>“{v.customMessage}”</li>
                                                    ))}
                                                </ul>
                                            )}
                                        </li>
                                    ))}
                            </ul>
                        )}
                    </div>
                ))
            )}
        </div>
    );
};

export default EventWinnersPage;

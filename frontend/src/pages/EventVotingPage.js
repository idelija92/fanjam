import React, { useEffect, useState, useContext } from 'react';
import { voteForSong, unvoteForSong, getVotesForEvent } from '../api/songVotes';
import { AuthContext } from '../context/AuthContext'; // adjust if your context path is different

const EventVotingPage = ({ eventId }) => {
    const { token } = useContext(AuthContext);

    const [songTitle, setSongTitle] = useState('');
    const [votes, setVotes] = useState([]);

    const fetchVotes = async () => {
        try {
            const res = await getVotesForEvent(eventId, token);
            setVotes(res.data);
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
        <div>
            <h2>Vote for Songs</h2>

            <input
                type="text"
                placeholder="Song title..."
                value={songTitle}
                onChange={(e) => setSongTitle(e.target.value)}
            />
            <button onClick={handleVote}>Vote</button>

            <h3>Current Votes:</h3>
            <ul>
                {votes.map((vote) => (
                    <li key={vote.id}>
                        {vote.songTitle}
                        <button onClick={() => handleUnvote(vote.songTitle)}>Unvote</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EventVotingPage;

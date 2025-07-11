import React, { useEffect, useState, useContext } from 'react';
import { voteForSong, unvoteForSong, getVotesForEvent } from '../api/songVotes';
import { AuthContext } from '../context/AuthContext';
import { useParams, Link } from 'react-router-dom';
import API from '../services/api';
import { Card, ListGroup, Badge, Spinner, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Navbar, Nav } from 'react-bootstrap';


const EventVotingPage = () => {
    const { token } = useContext(AuthContext);
    const { eventId } = useParams();

    const [songTitle, setSongTitle] = useState('');
    const [customMessage, setCustomMessage] = useState('');
    const [mode, setMode] = useState('setlist');

    const [votes, setVotes] = useState([]);
    const [voteCounts, setVoteCounts] = useState({});
    const [eventData, setEventData] = useState(null);
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

    const fetchEvent = async () => {
        try {
            const res = await API.get(`/events/${eventId}`);
            setEventData(res.data);
        } catch (err) {
            console.error('Failed to load event data', err);
        }
    };

    const handleVote = async () => {
        const titleToVote = selectedSong || songTitle;
        if (!titleToVote.trim()) {
            alert('Please select or enter a song');
            return;
        }

        try {
            await voteForSong(eventId, titleToVote, token, customMessage);
            setSongTitle('');
            setSelectedSong('');
            setCustomMessage('');
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
        fetchEvent();
    }, [eventId]);

    return (

<Container className="my-5">
  {!eventData ? (
    <div className="text-center">
      <Spinner animation="border" role="status" />
      <p className="mt-3">Loading event...</p>
    </div>
  ) : (
    <>

                 <div className="d-flex justify-content-center">
                      <div className="card" style={{ width: "18rem" }}>
                        <img className="card-img-top" src="/guitar.jpg" alt="Card image cap" />

                        <div className="card-body">
                          <h4 className="card-title">{eventData.title}</h4>

                          <p className="event-details mb-1">{eventData.date} at</p>
                          <p className="mb-2">
                            <strong>{eventData.venue}</strong>
                          </p>

                          <hr />

                          <div className="d-grid gap-2">
                            <a href="/" className="btn btn-outline-warning">
                              Home
                            </a>

                            <a href="/events" className="btn btn-outline-secondary">
                              ← Back to Events
                            </a>
                            <a href={`/events/${eventId}/winners`} className="btn btn-outline-secondary">
                           Current Song Rankings >>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                     <h3 className="display-7 fw-normal text-muted">Vote for Song</h3>
                        <hr/>

<p> *************************Add form for casting votes here************************************</p>



 <h3 className="display-7 fw-normal text-muted">Current Votes</h3>
                        <hr/>
{/*<h2 className="mt-5">Current Votes</h2>*/}
{votes.length === 0 ? (
  <p>No votes yet! Be the first to vote!</p>
) : (
<div className="d-flex justify-content-center mt-4">
  <div className="col-md-8">
      <Card>
        <Card.Header className="bg-secondary text-white">
          <h5 className="mb-0">All Voted Songs</h5>
        </Card.Header>

        <Card.Body className="p-0">
          <ListGroup className="list-group-flush">
            {Object.entries(voteCounts)
              .sort((a, b) => b[1] - a[1]) // Sort by vote count descending
              .map(([title, count]) => (
                <ListGroup.Item key={title}>
                  <div className="d-flex justify-content-between align-items-center">
                    <strong>{title}</strong>
                    <Badge bg="warning">{count}</Badge>
                  </div>

                  {votes.some(v => v.songTitle === title && v.customMessage) && (
                    <ul className="text-muted fst-italic mt-2 ps-3 mb-0">
                      {votes
                        .filter(v => v.songTitle === title && v.customMessage)
                        .map((v, i) => (
                          <li key={i}>“{v.customMessage}”</li>
                        ))}
                    </ul>
                  )}

                  <div className="mt-2">
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleUnvote(title)}
                    >
                      Unvote
                    </button>
                  </div>
                </ListGroup.Item>
              ))}
          </ListGroup>
        </Card.Body>
      </Card>
    </div>
  </div>
)}









        <div style={{ textAlign: 'center', marginTop: '2rem' }}>

            <h1>Vote for Songs</h1>
            <Link to="/events">← Back to Events</Link>
            <br />
            <Link to={`/events/${eventId}/winners`} style={{ marginTop: '1rem', display: 'inline-block' }}>
                View Current Song Rankings
            </Link>

            <div style={{ marginTop: '2rem' }}>


                <h2>Choose Your Voting Option:</h2>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem' }}>
                    <label>
                        <input
                            type="radio"
                            name="mode"
                            value="setlist"
                            checked={mode === 'setlist'}
                            onChange={() => setMode('setlist')}
                        /> Setlist
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="mode"
                            value="custom"
                            checked={mode === 'custom'}
                            onChange={() => setMode('custom')}
                        /> Song Request
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="mode"
                            value="customWithMessage"
                            checked={mode === 'customWithMessage'}
                            onChange={() => setMode('customWithMessage')}
                        /> Custom Song + Message
                    </label>
                </div>
            </div>

            {mode === 'setlist' && eventData?.bands?.length > 0 && (
                <div style={{ marginTop: '2rem' }}>
                    <h3>Select from Band Setlists:</h3>
                    <select
                        value={selectedSong}
                        onChange={(e) => setSelectedSong(e.target.value)}
                        style={{ padding: '0.5rem', marginBottom: '1rem' }}
                    >
                        <option value="">-- Select a song --</option>
                        {eventData.bands.flatMap((band) =>
                            band.setlist?.map((song, index) => (
                                <option key={`${band.name}-${index}`} value={song}>
                                    {song} — ({band.name})
                                </option>
                            ))
                        )}
                    </select>
                </div>
            )}

            {(mode === 'custom' || mode === 'customWithMessage') && (
                <div style={{ marginTop: '2rem' }}>
                    <h3>Enter Song Title:</h3>
                    <input
                        type="text"
                        placeholder="Enter song title..."
                        value={songTitle}
                        onChange={(e) => setSongTitle(e.target.value)}
                        style={{ padding: '0.5rem', width: '250px' }}
                    />
                </div>
            )}

            {mode === 'customWithMessage' && (
                <div style={{ marginTop: '1.5rem' }}>
                    <h3>Optional Message (Lyrics, Dedication, etc.):</h3>
                    <textarea
                        value={customMessage}
                        onChange={(e) => setCustomMessage(e.target.value)}
                        rows={4}
                        style={{ padding: '0.5rem', width: '300px' }}
                        placeholder="Write your message here..."
                    />
                </div>
            )}

            <div style={{ marginTop: '1.5rem' }}>
                <button onClick={handleVote} style={{ padding: '0.7rem 1.5rem' }}>
                    Submit Vote
                </button>
            </div>

            <h2 style={{ marginTop: '2rem' }}>Current Votes:</h2>

            {votes.length === 0 ? (
                <p>No votes yet! Be the first to vote!</p>
            ) : (
                <ul style={{ listStyleType: 'none', padding: 0 }}>
                    {Object.entries(voteCounts).map(([title, count]) => (
                        <li key={title} style={{ marginBottom: '1rem' }}>
                            <strong>{title}</strong> — {count} vote{count > 1 ? 's' : ''}
                            <ul style={{ fontStyle: 'italic', color: '#555', marginTop: '0.3rem', paddingLeft: 0 }}>
                                {votes
                                    .filter(v => v.songTitle === title && v.customMessage)
                                    .map((v, i) => (
                                        <li key={i}>“{v.customMessage}”</li>
                                    ))}
                            </ul>
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


 </>
  )}
</Container>



    );

};

export default EventVotingPage;

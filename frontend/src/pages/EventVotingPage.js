import React, { useEffect, useState, useContext } from 'react';
import { voteForSong, unvoteForSong, getVotesForEvent } from '../api/songVotes';
import { AuthContext } from '../context/AuthContext';
import { useParams, Link } from 'react-router-dom';
import API from '../services/api';
import { Card, ListGroup, Badge, Spinner, Form, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Navbar, Nav } from 'react-bootstrap';
import { uniq } from 'lodash';
//import './styles/EventVoting.css';


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
                  <Link to="/" className="btn btn-outline-warning">
                    Home
                  </Link>

                  <Link to="/events" className="btn btn-outline-secondary">
                    ← Back to Events
                  </Link>

                  <Link to={`/events/${eventId}/winners`} className="btn btn-outline-secondary">
                    Current Song Rankings
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <h3 className="display-7 fw-normal text-muted mt-5">Vote for Song</h3>
          <hr />

          {/* Voting Radio buttons Options
           <div className="d-flex justify-content-center">
             <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center gap-3 text-center text-md-start">
               <h5 className="fw-normal text-muted mb-0" style={{ minWidth: '200px' }}>
                 Select Voting Option:
               </h5>

               <div className="d-flex flex-column flex-md-row gap-2">
                 {['setlist', 'custom', 'customWithMessage'].map((option, i) => (
                   <div className="form-check form-check-inline" key={i}>
                     <input
                       className="form-check-input custom-radio-warning"
                       type="radio"
                       name="inlineRadioOptions"
                       id={`inlineRadio${i + 1}`}
                       value={option}
                       checked={mode === option}
                       onChange={() => setMode(option)}
                     />
                     <label className="form-check-label" htmlFor={`inlineRadio${i + 1}`}>
                       {option === 'setlist'
                         ? 'Song Setlist'
                         : option === 'custom'
                         ? 'Song Request'
                         : 'Custom Song + Message'}
                     </label>
                   </div>
                 ))}
               </div>
             </div>
           </div>
*/}

          {/* Vote Form Inside Card */}
          <div className="d-flex justify-content-center mt-4">
            <div className="col-md-8">
              <Card>
                <Card.Header className="bg-secondary text-white">
                  <h5 className="mb-0">Submit Your Vote</h5>
                </Card.Header>

                <Card.Body>



                  {/* Voting Radio buttons Options (now inside card body) */}
                  <div className="mb-4">
                    <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center gap-3 text-center text-md-start">
                      {/* <h5 className="fw-normal text-muted mb-0" style={{ minWidth: '100px' }}>
                                Select Voting Option:
                              </h5>*/}

                      <div className="d-flex flex-column flex-md-row gap-2">
                        {['setlist', 'custom', 'customWithMessage'].map((option, i) => (
                          <div className="form-check form-check-inline" key={i}>
                            <input
                              className="form-check-input custom-radio-warning"
                              type="radio"
                              name="inlineRadioOptions"
                              id={`inlineRadio${i + 1}`}
                              value={option}
                              checked={mode === option}
                              onChange={() => setMode(option)}
                            />
                            <label className="form-check-label" htmlFor={`inlineRadio${i + 1}`}>
                              {option === 'setlist'
                                ? 'Song Setlist'
                                : option === 'custom'
                                  ? 'Song Request'
                                  : 'Custom Song + Message'}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>






                  {/* Setlist Mode */}
                  {mode === 'setlist' && eventData?.bands?.length > 0 && (
                    <Form.Group controlId="songSelect" className="mb-4">
                      <Form.Label className="fw-semibold">Choose a Song:</Form.Label>
                      <Form.Select
                        value={selectedSong}
                        onChange={(e) => setSelectedSong(e.target.value)}
                      >
                        <option value="">-- Select a song --</option>
                        {eventData.bands.flatMap((band) =>
                          band.setlist?.map((song, index) => (
                            <option key={`${band.name}-${index}`} value={song}>
                              {song} — ({band.name})
                            </option>
                          ))
                        )}
                      </Form.Select>
                    </Form.Group>
                  )}

                  {/* Custom Song Title */}
                  {(mode === 'custom' || mode === 'customWithMessage') && (
                    <Form.Group controlId="customTitle" className="mb-4">
                      <Form.Label className="fw-semibold">Enter Song Title:</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter song title..."
                        value={songTitle}
                        onChange={(e) => setSongTitle(e.target.value)}
                        style={{ maxWidth: '300px' }}
                      />
                    </Form.Group>
                  )}

                  {/* Optional Message */}
                  {mode === 'customWithMessage' && (
                    <Form.Group controlId="customMessage" className="mb-4">
                      <Form.Label className="fw-semibold">Optional Message:</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={4}
                        placeholder="Lyrics, Dedication, etc."
                        value={customMessage}
                        onChange={(e) => setCustomMessage(e.target.value)}
                        style={{ maxWidth: '400px' }}
                      />
                    </Form.Group>
                  )}

                  <button className="btn btn-warning px-4 py-2" onClick={handleVote} >
                    Submit Vote
                  </button>
                </Card.Body>
              </Card>
            </div>
          </div>


          {/*//******Current Votes Card*******/}
          <h3 className="display-7 fw-normal text-muted">Current Votes</h3>
          <hr />

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
                                className="btn btn-sm btn-outline-secondary my-2 me-3"
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
        </>

      )}
    </Container>



  );

};

export default EventVotingPage;

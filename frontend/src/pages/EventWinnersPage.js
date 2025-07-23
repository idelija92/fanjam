import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Card, ListGroup, Badge, Spinner, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Navbar, Nav } from 'react-bootstrap';



const EventWinnersPage = () => {
    const { eventId } = useParams();
    const [votes, setVotes] = useState([]);
    const [eventData, setEventData] = useState(null);
    const [bandVoteMap, setBandVoteMap] = useState({});

const getEventImage = (event) => {
          if (event.venue === 'The Curragh Racecourse') return '/Horse-Country.png';
          if (event.venue === 'Shenanigans Pub') return '/flame_guitar_venue.png';
          if (event.venue === 'Messers Pub') return 'crowd_hands_up.jpg';
          if (event.venue === 'Whelans') return 'https://www.google.com/imgres?q=whelans%20dublin%20logo&imgurl=https%3A%2F%2Fwww.whelanslive.com%2Fwp-content%2Fthemes%2Fyootheme%2Fcache%2Fa8%2Fwhelans-logo-black-new-a8956028.png&imgrefurl=https%3A%2F%2Fwww.whelanslive.com%2Fabout%2Fhistory%2F&docid=kMpgbjW0578jrM&tbnid=iiKI65Agdt_lNM&vet=12ahUKEwiP9_WOv8yOAxW2QUEAHVEAIbEQM3oECBMQAA..i&w=220&h=136&hcb=2&ved=2ahUKEwiP9_WOv8yOAxW2QUEAHVEAIbEQM3oECBMQAA';
          if (event.location === 'Dublin') return '/mic2.png';
          return '/guitar.jpg';
        };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [voteRes, eventRes] = await Promise.all([
                    axios.get(`http://54.195.241.54:8080/api/song-votes/event/${eventId}`),
                    axios.get(`http://54.195.241.54:8080/api/events/${eventId}`)
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
            {/* ✅ Fix image source */}
            <img className="card-img-top" src={getEventImage(eventData)} alt="Event" />

            <div className="card-body">
              <h4 className="card-title">{eventData.title}</h4>

              <p className="event-details mb-1">{eventData.date} at</p>
              <p className="mb-2">
                <strong>{eventData.venue}</strong>
              </p>

              <hr />

              <div className="d-grid gap-2">
                {/* ✅ Convert anchor tags to React Router Links with Bootstrap styling */}
                <Link to="/" className="btn btn-outline-warning">
                  Home
                </Link>
                <Link to="/events" className="btn btn-outline-secondary">
                  ← Back to Events
                </Link>
              </div>
            </div>
          </div>
        </div>

        <h3 className="display-7 fw-normal text-muted">Current Votes</h3>
        <hr />

        <div className="row">
          {Object.entries(bandVoteMap).map(([bandName, bandVotes]) => (
            <div key={bandName} className="col-md-6 mb-4">
              <Card>
                <Card.Header className="bg-secondary text-white">
                  <h5 className="mb-0">{bandName}</h5>
                </Card.Header>

                <Card.Body className="p-0">
                  {bandVotes.length === 0 ? (
                    <div className="p-3 text-muted">No votes</div>
                  ) : (
                    <ListGroup className="list-group-flush">
                      {Object.entries(
                        bandVotes.reduce((acc, vote) => {
                          acc[vote.songTitle] = acc[vote.songTitle] || [];
                          acc[vote.songTitle].push(vote);
                          return acc;
                        }, {})
                      )
                        .sort((a, b) => b[1].length - a[1].length)
                        .map(([title, votes]) => (
                          <ListGroup.Item key={title}>
                            <div className="d-flex justify-content-between align-items-center">
                              <strong>{title}</strong>
                              <Badge bg="warning">{votes.length}</Badge>
                            </div>

                            {votes.some(v => v.customMessage) && (
                              <ul className="text-muted fst-italic mt-2 ps-3 mb-0">
                                {votes
                                  .filter(v => v.customMessage)
                                  .map((v, i) => (
                                    <li key={i}>“{v.customMessage}”</li>
                                  ))}
                              </ul>
                            )}
                          </ListGroup.Item>
                        ))}
                    </ListGroup>
                  )}
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      </>
    )}
  </Container>
);
};

export default EventWinnersPage;

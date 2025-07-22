// ✅ UPDATED EditSetlist.js with add/remove song UI

import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import API from '../services/api';
import FormWrapper from '../components/form/FormWrapper';
import FormButton from '../components/form/FormButton';
import { Card, Table, Form, ListGroup, Button, Navbar, Nav, Container} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


const EditSetlist = () => {
    const { eventId } = useParams();
    const [songs, setSongs] = useState([]);
    const [customSlots, setCustomSlots] = useState(0);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const [event, setEvent] = useState(null);
    const [band, setBand] = useState(null);


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
    API.get(`/events/${eventId}`)
      .then(res => {
        setEvent(res.data);
      })
      .catch(err => {
        console.error('Failed to fetch event details', err);
      });
  }, [eventId]);


/*API.get(`/events/${eventId}`)
  .then(res => {
    setEvent(res.data);
    const bandId = res.data.bandId;
    if (bandId) {
      API.get(`/bands/${bandId}`)
        .then(bandRes => setBand(bandRes.data))
        .catch(err => console.error("Failed to fetch band", err));
    }
  })
  .catch(err => {
    console.error('Failed to fetch event details', err);
  });
*/


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
<>
    <div className="d-flex justify-content-center mt-4">
          <div className="col-md-8">
            <Card className="shadow">

              <Card.Header className="bg-secondary text-white text-center">
                <h5>Edit Setlist </h5>
                {/*<h6>
                  {' '}
                  {event && event.bands?.length === 1
                    ? event.bands[0].name
                    : event && event.bands?.length > 1
                    ? 'Multiple Bands'
                    : ''}
                </h6>

                {event && event.bands?.length > 1 && (
                  <div className="mb-2">
                    {event.bands.map((band) => (
                      <div key={band.id}>
                        <strong>{band.name}</strong>
                      </div>
                    ))}
                  </div>
                )}
*/}
                {event && (
                  <small className="d-block mt-1">
                     For <strong>{event.title}</strong>
                  </small>
                )}
              </Card.Header>




              <Card.Body>
              <div className="row font-weight-bold text-muted mb-2 px-2 d-none d-md-flex text-center">

                             <div className="col-md-9"><strong>Setlist Songs</strong></div>
                             <div className="col-md-3"><strong>Actions</strong></div>
                           </div>

                            <Form onSubmit={handleSubmit}>
                                          {songs.map((song, index) => (
                                            <Form.Group
                                              key={index}
                                              className="row align-items-center border-bottom py-2 mx-1"
                                            >
                                              {/* Song input */}
                                              <div className="col-12 col-md-9 mb-2 mb-md-0">
                                                <Form.Label className="d-md-none fw-bold">Song</Form.Label>
                                                <Form.Control
                                                  type="text"
                                                  value={song}
                                                  onChange={(e) => updateSong(index, e.target.value)}
                                                  className="bg-light"
                                                  placeholder={`Song ${index + 1}`}
                                                />
                                              </div>
                                                                 {/* Delete button */}
                                                                 <div className="col-12 col-md-3 text-md-center">
                                                                   <Button
                                                                     type="button"
                                                                     variant="outline-danger"
                                                                     onClick={() => removeSong(index)}
                                                                   >
                                                                     ❌ Remove
                                                                   </Button>
                                                                 </div>
                                                               </Form.Group>
                                                             ))}

                                                             {/* Add Song Button */}
                                                             <div className="text-center mt-3">
                                                               <Button type="button" variant="outline-warning" onClick={addSong}>
                                                                + Add Song
                                                               </Button>
                                                             </div>
                                                             <hr></hr>

  {/* Custom Song Slots Input */}
<Form.Group className="row align-items-center mb-3">
  <div className="col-md-3 col-8">
    <Form.Label className="mb-0 text-muted"><strong>Number of Custom Song Slots:</strong></Form.Label>
  </div>
  <div className="col-md-1 col-8">
    <Form.Control
      type="number"
      min="0"
      value={customSlots}
      onChange={(e) => setCustomSlots(Number(e.target.value))}
      size="sm"
    />
  </div>
</Form.Group>



               {/* Submit Button */}
               <div className="col-12 d-flex justify-content-center mt-3">
                 <FormButton type="submit" className="btn btn-secondary ">
                   Save Setlist
                 </FormButton>
               </div>

               {/* Error Message */}
               {error && <p className="text-danger mt-3 text-center">{error}</p>}
             </Form>

         </Card.Body>
       </Card>
     </div>
   </div>


{/*
// original form
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
        */}
        </>
    );
};

export default EditSetlist;

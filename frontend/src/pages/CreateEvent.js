import React, { useState, useEffect } from 'react';
import API from '../services/api';
import { Link } from 'react-router-dom';
import FormWrapper from '../components/form/FormWrapper';
import FormInput from '../components/form/FormInput';
import FormButton from '../components/form/FormButton';
import { Form, Button, Container, Row, Col, Alert, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const CreateEvent = () => {
  const [form, setForm] = useState({
    title: '', date: '', time: '', venue: '', location: '', description: '', type: 'FREE', bands: []
  });

  const [allBands, setAllBands] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    API.get('/bands').then(res => setAllBands(res.data));
  }, []);


 const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

   const handleBandSelection = e => {
     const selected = Array.from(e.target.selectedOptions).map(option => ({ id: Number(option.value) }));
     setForm({ ...form, bands: selected });
   };

   const handleSubmit = async e => {
     e.preventDefault();
     try {
       await API.post('/events', form);
       setError('');
       alert('Event created!');
     } catch (err) {
       console.error(err);
       setError('Failed to create event');
     }
   };

 return (

    <div className="d-flex justify-content-center mt-4">
      <div className="col-md-7">
        <Card className="shadow">
          <Card.Header className="bg-secondary text-white text-center">
            <h5 className="mb-0">Create Event</h5>
          </Card.Header>

          <Card.Body>


            {error && <Alert variant="danger">{error}</Alert>}

            <Form onSubmit={handleSubmit} encType="multipart/form-data">
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Title</Form.Label>
                <Form.Control
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="Event Title"
                />
              </Form.Group>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                     <Form.Label className="fw-bold">Date</Form.Label>
                    <Form.Control
                      type="date"
                      name="date"
                      value={form.date}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                   <Form.Label className="fw-bold">Time</Form.Label>
                    <Form.Control
                      type="time"
                      name="time"
                      value={form.time}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-3">
               <Form.Label className="fw-bold">Location</Form.Label>
                <Form.Control
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  placeholder="City, State"
                />
              </Form.Group>

              <Form.Group className="mb-3">
               <Form.Label className="fw-bold">Venue</Form.Label>
                <Form.Control
                  name="venue"
                  value={form.venue}
                  onChange={handleChange}
                  placeholder="Venue Name"
                />
              </Form.Group>

              <Form.Group className="mb-3">
               <Form.Label className="fw-bold">Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
               <Form.Label className="fw-bold">Event Type</Form.Label>
                <Form.Select name="type" value={form.type} onChange={handleChange}>
                  <option value="FREE">Free</option>
                  <option value="PAID">Paid</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Select Bands</Form.Label>
                <Form.Select multiple onChange={handleBandSelection}>
                  {allBands.map((band) => (
                    <option key={band.id} value={band.id}>
                      {band.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>




                            <div
                              className="
                                d-flex
                                flex-column flex-sm-column flex-md-row
                                flex-wrap
                                justify-content-center
                                gap-3
                                mx-auto
                              "
                              style={{ maxWidth: '500px' }}  // limits container width on large screens
                            >
                <Button variant="warning" type="submit">
                  Create Event
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};


export default CreateEvent;


 {/* const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleBandSelection = e => {
    const selected = Array.from(e.target.selectedOptions).map(option => ({ id: Number(option.value) }));
    setForm({ ...form, bands: selected });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await API.post('/events', form);
      setError('');
      alert('Event created!');
    } catch (err) {
      console.error(err);
      setError('Failed to create event');
    }
  };

  return (
    <FormWrapper title="Create Event">
      <p><Link to="/events">← Back to Events</Link></p>
      <form onSubmit={handleSubmit}>
        <FormInput name="title" placeholder="Title" value={form.title} onChange={handleChange} />
        <FormInput name="date" type="date" value={form.date} onChange={handleChange} />
        <FormInput name="time" type="time" value={form.time} onChange={handleChange} />
        <FormInput name="location" placeholder="Location" value={form.location} onChange={handleChange} />
        <FormInput name="venue" placeholder="Venue" value={form.venue} onChange={handleChange} />
        <FormInput name="description" placeholder="Description" value={form.description} onChange={handleChange} />

        <label>Event Type:</label>
        <select name="type" value={form.type} onChange={handleChange}>
          <option value="FREE">Free</option>
          <option value="PAID">Paid</option>
        </select><br />

        <label>Select Bands:</label><br />
        <select multiple onChange={handleBandSelection} style={{ width: '100%', marginBottom: '1rem' }}>
          {allBands.map(band => (
            <option key={band.id} value={band.id}>{band.name}</option>
          ))}
        </select>

        <FormButton type="submit">Create</FormButton>
      </form>
      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
    </FormWrapper>
  );
};

export default CreateEvent;
*/}
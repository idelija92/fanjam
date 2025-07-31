import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import API from '../services/api';
import FormWrapper from '../components/form/FormWrapper';
import FormInput from '../components/form/FormInput';
import FormButton from '../components/form/FormButton';
import '../components/form/form.css';
import { AuthContext } from '../context/AuthContext';
import useRole from '../hooks/useRole';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Navbar, Nav, Container,Row, Col, Card, Form} from 'react-bootstrap';

const EditEvent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);
  const { isAdmin, isVenue } = useRole();

  const [form, setForm] = useState({
    title: '', date: '', time: '', venue: '', location: '', description: '', type: 'FREE', bands: []
  });
  const [allBands, setAllBands] = useState([]);
  const [error, setError] = useState('');

  const admin = isAdmin();
  const venue = isVenue();

  useEffect(() => {
    if (!admin && !venue) {
      navigate('/events');
      return;
    }

    const fetchData = async () => {
      try {
        const [eventRes, bandsRes] = await Promise.all([
          API.get(`/events/${id}`),
          API.get('/bands')
        ]);

        const eventData = eventRes.data;
        setForm({
          ...eventData,
          bands: Array.isArray(eventData.bands) ? eventData.bands.map(b => ({ id: b.id })) : []
        });

        setAllBands(bandsRes.data);
      } catch (err) {
        console.error('Failed to load data:', err);
        setError('Failed to load event or bands');
      }
    };

    fetchData();
  }, [id, navigate]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleBandSelection = e => {
    const selected = Array.from(e.target.selectedOptions).map(option => ({ id: Number(option.value) }));
    setForm({ ...form, bands: selected });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await API.put(`/events/${id}`, form);
      navigate(venue ? '/venue/dashboard' : '/events');
    } catch (err) {
      console.error(err);
      setError('Failed to update event');
    }
  };

  return (
    /*<FormWrapper title="Edit Event">
      <p><Link to="/events">← Back to Events</Link></p>
      <form onSubmit={handleSubmit}>
        <FormInput name="title" value={form.title || ''} onChange={handleChange} placeholder="Title" />
        <FormInput name="date" type="date" value={form.date || ''} onChange={handleChange} />
        <FormInput name="time" type="time" value={form.time || ''} onChange={handleChange} />
        <FormInput name="venue" value={form.venue || ''} onChange={handleChange} placeholder="Venue" />
        <FormInput name="location" value={form.location || ''} onChange={handleChange} placeholder="Location" />
        <FormInput name="description" value={form.description || ''} onChange={handleChange} placeholder="Description" />

        <label>Event Type:</label>
        <select className="form-select" name="type" value={form.type || 'FREE'} onChange={handleChange}>
          <option value="FREE">Free</option>
          <option value="PAID">Paid</option>
        </select>

        <label>Select Bands:</label>
        <select
          className="form-select"
          multiple
          value={form.bands.map(b => b.id)}
          onChange={handleBandSelection}
        >
          {allBands.map(b => (
            <option key={b.id} value={b.id}>{b.name}</option>
          ))}
        </select>

        <FormButton type="submit">Update</FormButton>
      </form>
      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
    </FormWrapper>
    */

    <div className="d-flex justify-content-center mt-4">
      <div className="col-md-7">
        <Card className="shadow">
          <Card.Header className="bg-secondary text-white text-center">
            <h5 className="mb-0">Edit Event</h5>
          </Card.Header>

          <Card.Body className="p-4">
            <div className="mb-3">
              <Link to="/events" className="btn btn-outline-secondary btn-sm">
                ← Back to Events
              </Link>
            </div>

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  placeholder="Event title"
                  value={form.title || ''}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

             <div className="row">
               <Form.Group className="col-md-6 mb-3">
                 <Form.Label>Date</Form.Label>
                 <Form.Control
                   type="date"
                   name="date"
                   value={form.date || ''}
                   onChange={handleChange}
                   required
                 />
               </Form.Group>

               <Form.Group className="col-md-6 mb-3">
                 <Form.Label>Time</Form.Label>
                 <Form.Control
                   type="time"
                   name="time"
                   value={form.time || ''}
                   onChange={handleChange}
                   required
                 />
               </Form.Group>
             </div>

              <Form.Group className="mb-3">
                <Form.Label>Venue</Form.Label>
                <Form.Control
                  type="text"
                  name="venue"
                  placeholder="Venue name"
                  value={form.venue || ''}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Location</Form.Label>
                <Form.Control
                  type="text"
                  name="location"
                  placeholder="City or Address"
                  value={form.location || ''}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  name="description"
                  placeholder="Event description"
                  value={form.description || ''}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Event Type</Form.Label>
                <Form.Select name="type" value={form.type || 'FREE'} onChange={handleChange}>
                  <option value="FREE">Free</option>
                  <option value="PAID">Paid</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>Select Bands</Form.Label>
                <Form.Select
                  multiple
                  name="bands"
                  value={form.bands.map(b => b.id)}
                  onChange={handleBandSelection}
                >
                  {allBands.map(b => (
                    <option key={b.id} value={b.id}>
                      {b.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <div className="text-center">
                <Button variant="warning" type="submit">
                  Update
                </Button>
              </div>

              {error && (
                <p className="text-danger text-center mt-3">{error}</p>
              )}
            </Form>
          </Card.Body>
        </Card>
      </div>
    </div>

  );
};

export default EditEvent;

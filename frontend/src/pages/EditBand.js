import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import API from '../services/api';
import FormWrapper from '../components/form/FormWrapper';
import FormInput from '../components/form/FormInput';
import FormButton from '../components/form/FormButton';
import useRole from '../hooks/useRole';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Navbar, Nav, Container,Row, Col, Card, Form} from 'react-bootstrap';

const EditBand = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', genre: '', description: '', managerId: '' });
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  const { isAdmin } = useRole();
  if (!isAdmin) return <p>Access denied</p>;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [bandRes, usersRes] = await Promise.all([
          API.get(`/bands/${id}`),
          API.get('/users')
        ]);

        const band = bandRes.data;
        setForm({
          name: band.name,
          genre: band.genre,
          description: band.description,
          managerId: band.manager?.id || ''
        });

        const bandRoleUsers = usersRes.data.filter(user =>
          user.roles?.includes('BAND')
        );
        setUsers(bandRoleUsers);
      } catch (err) {
        console.error('Failed to load band or users', err);
        setError('Failed to load band or users');
      }
    };

    fetchData();
  }, [id]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const payload = {
        name: form.name,
        genre: form.genre,
        description: form.description,
        manager: { id: Number(form.managerId) }
      };
      await API.put(`/bands/${id}`, payload);
      navigate('/bands');
    } catch (err) {
      console.error(err);
      setError('Failed to update band');
    }
  };

  return (
    /*<FormWrapper title="Edit Band">
      <p><Link to="/bands">← Back to Bands</Link></p>
      <form onSubmit={handleSubmit}>
        <FormInput name="name" value={form.name} onChange={handleChange} placeholder="Name" />
        <FormInput name="genre" value={form.genre} onChange={handleChange} placeholder="Genre" />
        <FormInput name="description" value={form.description} onChange={handleChange} placeholder="Description" />

        <label>Assign Manager:</label>
        <select name="managerId" value={form.managerId} onChange={handleChange} required>
          <option value="">-- Select a Manager --</option>
          {users.map(user => (
            <option key={user.id} value={user.id}>{user.email}</option>
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
            <h5 className="mb-0">Edit Band</h5>
          </Card.Header>

          <Card.Body className="p-4">
            <div className="mb-3">
              <Link to="/bands" className="btn btn-outline-secondary btn-sm">
                ← Back to Bands
              </Link>
            </div>

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Band Name"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Genre</Form.Label>
                <Form.Control
                  type="text"
                  name="genre"
                  value={form.genre}
                  onChange={handleChange}
                  placeholder="Genre"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Description"
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>Assign Manager</Form.Label>
                <Form.Select
                  name="managerId"
                  value={form.managerId}
                  onChange={handleChange}
                  required
                >
                  <option value="">-- Select a Manager --</option>
                  {users.map(user => (
                    <option key={user.id} value={user.id}>
                      {user.email}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <div className="text-center">
                <Button type="submit" variant="warning">
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

export default EditBand;

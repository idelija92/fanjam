import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import API from '../services/api';
import FormWrapper from '../components/form/FormWrapper';
import FormInput from '../components/form/FormInput';
import FormButton from '../components/form/FormButton';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Navbar, Nav, Container, Row, Col, Card, Form } from 'react-bootstrap';

const ALL_ROLES = ['USER', 'ADMIN', 'BAND', 'VENUE'];

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', email: '', password: '', roles: [] });
  const [error, setError] = useState('');

  useEffect(() => {
    API.get(`/users/${id}`)
      .then(res => {
        setForm({ ...res.data, password: '' });
      })
      .catch(() => setError('Failed to load user'));
  }, [id]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleRoleChange = e => {
    const selected = Array.from(e.target.selectedOptions).map(option => option.value);
    setForm({ ...form, roles: selected });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const dataToSend = { username: form.username, email: form.email, roles: form.roles };
      if (form.password.trim() !== '') {
        dataToSend.password = form.password;
      }
      await API.put(`/users/${id}`, dataToSend);
      navigate('/users');
    } catch (err) {
      console.error(err);
      setError('Failed to update user');
    }
  };

  return (
    /*<FormWrapper title="Edit User">
      <p><Link to="/users">← Back to Users</Link></p>
      <form onSubmit={handleSubmit}>
        <FormInput name="username" value={form.username} onChange={handleChange} placeholder="Username" />
        <FormInput name="email" value={form.email} onChange={handleChange} placeholder="Email" />
        <FormInput type="password" name="password" value={form.password} onChange={handleChange} placeholder="Password" />

        <label>Roles:</label>
        <select multiple value={form.roles} onChange={handleRoleChange}>
          {ALL_ROLES.map(role => (
            <option key={role} value={role}>{role}</option>
          ))}
        </select>
        
        <FormButton type="submit">Update</FormButton>
      </form>
      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
    </FormWrapper>
    */
    <div className="d-flex justify-content-center mt-4">
      <div className="col-md-6">
        <Card className="shadow">
          <Card.Header className="bg-secondary text-white text-center">
            <h5 className="mb-0">Edit User</h5>
          </Card.Header>

          <Card.Body className="p-4">
            <div className="mb-3">
              <Link to="/users" className="btn btn-outline-secondary btn-sm">
                ← Back to Users
              </Link>
            </div>

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  name="username"
                  value={form.username}
                  onChange={handleChange}
                  placeholder="Username"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Email"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Password"
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>Roles</Form.Label>
                <Form.Select
                  multiple
                  value={form.roles}
                  onChange={handleRoleChange}
                >
                  {ALL_ROLES.map(role => (
                    <option key={role} value={role}>
                      {role}
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
export default EditUser;
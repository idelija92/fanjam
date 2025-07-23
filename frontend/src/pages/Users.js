import React, { useEffect, useState } from 'react';
import API from '../services/api';
import { Link } from 'react-router-dom';
import { Card, Table, Form, ListGroup, Button, Navbar, Nav, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    API.get('/users')
      .then(res => {
        console.log('Users from backend:', res.data);
        setUsers(res.data);
      })
      .catch(err => {
        console.error('Error fetching users:', err);
      });
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this user?')) return;
    try {
      await API.delete(`/users/${id}`);
      setUsers(users.filter(u => u.id !== id));
    } catch (err) {
      console.error('Delete failed', err);
    }
  };

return (
    <div className="d-flex justify-content-center mt-4">
      <div className="col-md-8">
        <Card className="shadow">
          <Card.Header className="bg-secondary text-white text-center">
            <h5 className="mb-0">Edit Users</h5>
          </Card.Header>

          <Card.Body className="p-3">
            {users.length === 0 ? (
              <p className="text-center">No users found</p>
            ) : (
              <>
                {/* Header Row */}
                <div className="row font-weight-bold text-muted mb-2 px-2 d-none d-md-flex text-center">
                  <div className="col-md-3"><strong>Username</strong></div>
                  <div className="col-md-3"><strong>Email</strong></div>
                  <div className="col-md-3"><strong>Role</strong></div>
                  <div className="col-md-3"><strong>Actions</strong></div>
                </div>

                {/* User Rows */}
                <Form>
                  {users.map(user => (
                    <Form.Group
                      key={user.id}
                      className="row align-items-center border-bottom py-2 mx-1"
                    >

                      <div className="col-md-3">
                      <Form.Label className="d-md-none mb-1 fw-bold">Username</Form.Label>
                        <Form.Control
                          type="text"
                          value={user.username}
                          disabled
                          className="bg-light"
                        />
                      </div>

                      <div className="col-md-3">
                      <Form.Label className="d-md-none mb-1 fw-bold">Email</Form.Label>
                        <Form.Control
                          type="email"
                          value={user.email}
                          disabled
                          className="bg-light"
                        />
                      </div>
                      <div className="col-md-3">
                      <Form.Label className="d-md-none mb-1 fw-bold">User Role</Form.Label>
                        <Form.Control
                          type="text"
                          value={user.roles?.join(', ')}
                          disabled
                          className="bg-light"
                        />
                      </div>
                      <div className="col-md-3 text-center">


                      <Link
                      to={`/users/edit/${user.id}`} className="btn btn-secondary my-2 me-3">
                               Edit User
                            </Link>

                            <Button
                             variant="outline-danger"
                             onClick={() => handleDelete(user.id)}
                            >
                              ❌ Delete
                            </Button>








                      </div>
                    </Form.Group>
                  ))}
                </Form>
              </>
            )}
          </Card.Body>
        </Card>
      </div>
    </div>



  );
};

export default Users;

{/*  <div>
         <h1>Users</h1>
         <Link to="/">← Back to Home</Link>
         <ul>
           {users.map(user => (
             <li key={user.id}>
               {user.username} — {user.email} — Roles: {user.roles?.join(', ')}
               <Link to={`/users/edit/${user.id}`}> [Edit]</Link>
               <button onClick={() => handleDelete(user.id)}>Delete</button>
             </li>
           ))}
         </ul>
       </div>
    </div>
    */}
import React, { useEffect, useState } from 'react';
import API from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { Card, Table, Form, ListGroup, Button, Navbar, Nav, Container} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const ALL_ROLES = ['USER', 'ADMIN', 'BAND', 'VENUE'];

function AdminUsers() {
    const { token } = React.useContext(AuthContext);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        API.get('/users')
            .then(res => setUsers(res.data))
            .catch(err => console.error(err));
    }, []);

    const updateRoles = (id, roles) => {
        const user = users.find(u => u.id === id);
        if (!user) return;

        const updatedUser = {
            username: user.username,
            email: user.email,
            roles
        };


        API.put(`/users/${id}`, updatedUser)
            .then(() => {
                setUsers(prev =>
                    prev.map(u => (u.id === id ? { ...u, roles } : u))
                );
            })
            .catch(err => console.error(err));
    };

    const toggleRole = (userId, role) => {
        const user = users.find(u => u.id === userId);
        if (!user) return;

        const hasRole = user.roles.includes(role);
        const newRoles = hasRole
            ? user.roles.filter(r => r !== role)
            : [...user.roles, role];

        updateRoles(userId, newRoles);
    };

    const deleteUser = (id) => {
        if (!window.confirm('Are you sure you want to delete this user?')) return;
        API.delete(`/users/${id}`)
            .then(() => setUsers(prev => prev.filter(user => user.id !== id)))
            .catch(err => {
                console.error(err);
                if (err.response?.status === 403) {
                    alert(err.response.data);
                } else {
                    alert('Failed to delete user.');
                }
            });
    };

return (
/* <>   */
  <div className="d-flex justify-content-center mt-4">
    <div className="col-md-8">
      <Card className="shadow">
        <Card.Header className="bg-secondary text-white text-center">
          <h5 className="mb-0">Admin Panel : Manage Users</h5>
        </Card.Header>

        <Card.Body className="p-3">
          {users.length === 0 ? (
            <p className="text-center">No users found</p>
          ) : (
            <>
              {/* Header Row - visible only on md and larger */}
              <div className="row font-weight-bold text-muted mb-2 px-2 d-none d-md-flex text-center">
                <div className="col-md-1"><strong>ID</strong></div>
                <div className="col-md-3"><strong>Username</strong></div>
                <div className="col-md-3"><strong>Email</strong></div>
                <div className="col-md-2"><strong>Edit Roles</strong></div>
                <div className="col-md-2"><strong>Actions</strong></div>
              </div>

              {/* User Rows */}
              <Form>
                {users.map(user => (
                  <Form.Group
                    key={user.id}
                    className="row align-items-center border-bottom py-2 mx-1"
                  >
                    <div className="col-md-1 mb-2 mb-md-0">
                      <Form.Label className="d-md-none mb-1 fw-bold">ID</Form.Label>
                      <Form.Control
                        type="text"
                        value={user.id}
                        disabled
                        className="bg-light"
                      />
                    </div>

                    <div className="col-md-3 mb-2 mb-md-0">
                      <Form.Label className="d-md-none mb-1 fw-bold">Username</Form.Label>
                      <Form.Control
                        type="text"
                        value={user.username}
                        disabled
                        className="bg-light"
                      />
                    </div>

                    <div className="col-md-3 mb-2 mb-md-0">
                      <Form.Label className="d-md-none mb-1 fw-bold">Email</Form.Label>
                      <Form.Control
                        type="email"
                        value={user.email}
                        disabled
                        className="bg-light"
                      />
                    </div>

                    <div className="col-md-2 mb-2 mb-md-0">
                        <Form.Label className="d-md-none mb-1 fw-bold">Roles</Form.Label>
                        {ALL_ROLES.map(role => (
                          <div key={role} className="form-check">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              id={`${user.id}-${role}`}
                              checked={user.roles.includes(role)}
                              onChange={() => toggleRole(user.id, role)}
                            />
                            <label className="form-check-label" htmlFor={`${user.id}-${role}`}>
                              {role}
                            </label>
                          </div>
                        ))}
                      </div>



                    <div className="col-md-2 text-center">
                      <Button
                        variant="outline-danger"

                        onClick={() => handleDelete(user.id)}
                        className="me-2"
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



 /*}     <div>
            <h2>Admin: Manage Users</h2>
            <table border="1" cellPadding="6">
                <thead>
                    <tr>
                        <th>ID</th><th>Username</th><th>Email</th><th>Roles</th><th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>
                                {ALL_ROLES.map(role => (
                                    <label key={role} style={{ display: 'block' }}>
                                        <input
                                            type="checkbox"
                                            checked={user.roles.includes(role)}
                                            onChange={() => toggleRole(user.id, role)}
                                        />
                                        {role}
                                    </label>
                                ))}
                            </td>
                            <td>
                                <button onClick={() => deleteUser(user.id)} style={{ marginLeft: '0.5rem' }}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>





</>
*/
  );
};
export default AdminUsers;




import React, { useEffect, useState } from 'react';
import API from '../services/api';
import { AuthContext } from '../context/AuthContext';
import "./styles/AdminPanel.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Navbar, Nav, Container,Carousel } from 'react-bootstrap';


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
        <div class="table-container">
             <div class="table-wrapper">
            <h2 class="table-heading">Admin: Manage Users</h2>
            <table border="1" cellPadding="6" background-color= "#f4f4f4" >
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
                                   <div className="form-check">
  <input
    className="form-check-input"
    type="checkbox"
    id={`role-${role}`}
    checked={user.roles.includes(role)}
    onChange={() => toggleRole(user.id, role)}
  />
  <label className="form-check-label" htmlFor={`role-${role}`}>
    {role}
  </label>
</div>
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
        </div>
    );
}

export default AdminUsers;

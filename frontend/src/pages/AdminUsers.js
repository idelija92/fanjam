import React, { useEffect, useState } from 'react';
import API from '../services/api';
import { AuthContext } from '../context/AuthContext';

function AdminUsers() {
  const { token } = React.useContext(AuthContext);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    API.get('/users')
      .then(res => setUsers(res.data))
      .catch(err => console.error(err));
  }, []);

  const updateRole = (id, newRole) => {
    const user = users.find(u => u.id === id);
    if (!user) return;
  
    const updatedUser = {
      ...user,
      role: newRole
    };
  
    API.put(`/users/${id}`, updatedUser)
      .then(() => {
        setUsers(prev => prev.map(u => u.id === id ? { ...u, role: newRole } : u));
      })
      .catch(err => console.error(err));
  };
  

  const deleteUser = (id) => {
    if (!window.confirm('Are you sure?')) return;
    API.delete(`/users/${id}`)
      .then(() => setUsers(prev => prev.filter(user => user.id !== id)))
      .catch(err => console.error(err));
  };

  return (
    <div>
      <h2>Admin: Manage Users</h2>
      <table border="1" cellPadding="6">
        <thead>
          <tr>
            <th>ID</th><th>Username</th><th>Email</th><th>Role</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td><td>{user.username}</td><td>{user.email}</td><td>{user.role}</td>
              <td>
                {user.role === 'USER' && (
                  <button onClick={() => updateRole(user.id, 'ADMIN')}>Promote</button>
                )}
                {user.role === 'ADMIN' && (
                  <button onClick={() => updateRole(user.id, 'USER')}>Demote</button>
                )}
                <button onClick={() => deleteUser(user.id)} style={{ marginLeft: '0.5rem' }}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminUsers;

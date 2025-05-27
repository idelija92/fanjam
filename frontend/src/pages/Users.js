import React, { useEffect, useState } from 'react';
import API from '../services/api';
import { Link } from 'react-router-dom';

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
    <div>
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
  );
};

export default Users;
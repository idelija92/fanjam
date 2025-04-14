import React, { useEffect, useState } from 'react';
import API from '../services/api';
import { Link } from 'react-router-dom';

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    API.get('/users')
      .then(res => {
        console.log('Users from backend:', res.data); // 👈 add this
        setUsers(res.data);
      })
      .catch(err => {
        console.error('Error fetching users:', err);
      });
  }, []);

  return (
    <div>
      <h1>Users</h1>
      <Link to="/">← Back to Home</Link>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.username} — {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
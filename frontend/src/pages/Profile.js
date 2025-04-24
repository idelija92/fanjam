import React, { useEffect, useState, useContext } from 'react';
import API from '../services/api';
import { AuthContext } from '../context/AuthContext';

function Profile() {
  const { token } = useContext(AuthContext);
  const [user, setUser] = useState(null);

  useEffect(() => {
    API.get('/auth/me')
      .then(res => setUser(res.data))
      .catch(err => console.error(err));
  }, []);

  if (!user) return <p>Loading profile...</p>;

  return (
    <div>
      <h2>My Profile</h2>
      <p><strong>Username:</strong> {user.username}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Role:</strong> {user.role}</p>
    </div>
  );
}

export default Profile;

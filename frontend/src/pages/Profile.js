import React, { useEffect, useState, useContext } from 'react';
import API from '../services/api';
import { AuthContext } from '../context/AuthContext';

function Profile() {
  const { token } = useContext(AuthContext);
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({ username: '', email: '' });

  useEffect(() => {
    API.get('/auth/me')
      .then(res => {
        setUser(res.data);
        setForm({ username: res.data.username, email: res.data.email });
      })
      .catch(err => console.error(err));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    API.put(`/users/${user.id}`, {
      ...user,
      username: form.username,
      email: form.email,
    })
      .then(res => {
        setUser(res.data);
        alert('Profile updated!');
      })
      .catch(err => {
        console.error(err);
        alert('Update failed.');
      });
  };

  if (!user) return <p>Loading profile...</p>;

  return (
    <div>
      <h2>My Profile</h2>

      <label>Username:</label>
      <input name="username" value={form.username} onChange={handleChange} />

      <br />

      <label>Email:</label>
      <input name="email" value={form.email} onChange={handleChange} />

      <br />

      <p><strong>Role:</strong> {user.role}</p>

      <button onClick={handleSave}>Save Changes</button>
    </div>
  );
}

export default Profile;

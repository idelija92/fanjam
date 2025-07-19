import React, { useState } from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';
import FormWrapper from '../components/form/FormWrapper';
import FormInput from '../components/form/FormInput';
import FormButton from '../components/form/FormButton';

function Register() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/register', {
        username,
        email,
        password
      });
      setMessage('Registration successful! Please log in.');
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      setMessage('Registration failed');
      console.error(err);
    }
  };

  return (
   <FormWrapper title="Register">
  <div className="container mt-5">
    <div className="card shadow-sm">
      <div className="card-header bg-primary text-white">
        <h5 className="mb-0">Register</h5>
      </div>
      <div className="card-body">
        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <FormInput
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <FormInput
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <FormInput
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
            />
          </div>

          <FormButton type="submit" className="btn btn-success">Register</FormButton>
        </form>

        {message && <p className="text-center mt-3">{message}</p>}
      </div>
    </div>
  </div>
</FormWrapper>

  );
}

export default Register;

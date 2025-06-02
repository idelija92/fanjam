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
      <form onSubmit={handleRegister}>
        <FormInput
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <FormInput
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <FormInput
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <FormButton type="submit">Register</FormButton>
      </form>
      {message && <p style={{ marginTop: '1rem', textAlign: 'center' }}>{message}</p>}
    </FormWrapper>
  );
}

export default Register;

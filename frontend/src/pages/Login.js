import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import API from '../services/api';
import FormWrapper from '../components/form/FormWrapper';
import FormInput from '../components/form/FormInput';
import FormButton from '../components/form/FormButton';
import useRole from '../hooks/useRole';

function Login() {
  const auth = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/login', { email, password });
      const token = res.data;
      auth.login(token);
      navigate('/');
    } catch (err) {
      console.error(err);
      if (err.response && err.response.status === 401) {
        toast.error('Invalid email or password. Please try again.');
      } else {
        toast.error('Login failed. Please try again later.');
      }
      localStorage.removeItem('token');
    }
  };

  return (
    <FormWrapper title="Login">
      <div className="container mt-5">
        <div className="card shadow-sm">
          <div className="card-header bg-primary text-white">
            <h5 className="mb-0">Login</h5>
          </div>
          <div className="card-body">
            <p className="text-center">
              <Link to="/" className="btn btn-secondary btn-sm mb-3">← Back to Home</Link>
            </p>
            <form onSubmit={handleLogin}>
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

              <FormButton type="submit" className="btn btn-success">Login</FormButton>
            </form>

            {message && <p className="text-center mt-3">{message}</p>}
          </div>
        </div>
      </div>
    </FormWrapper>

  );
}

export default Login;

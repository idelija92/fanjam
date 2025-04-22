import * as React from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import API from '../services/api';

console.log('Raw AuthContext:', AuthContext);

function Login() {

    const auth = React.useContext(AuthContext);
    console.log('Login component is rendering');
    console.log('Auth context before login: :', auth);

    //const { login } = useContext(AuthContext);
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [message, setMessage] = React.useState('');

    const navigate = useNavigate();


  const handleLogin = async (e) => {
    e.preventDefault();
    try {
        console.log('Attempting login with:', email, password);

      const res = await API.post('/auth/login', { email, password });
      const token = res.data;

      if (!auth || !auth.login) {
        console.warn('Auth context not available!');
        setMessage('Login failed (context not ready)');
        return;
      }
      
      auth.login(token);
      setMessage('Login successful!');
      navigate('/');  
    } catch (err) {
      setMessage('Login failed');
      console.error(err);
    }
  };
  

  return (
    <div>
      <h2>Login</h2>
      <Link to="/">← Back to Home</Link>
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="Email" value={email}
               onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password}
               onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Login</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default Login;

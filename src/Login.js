import React, { useState } from 'react';
import request from 'superagent';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = () => {
    request
      .post('http://localhost:8000/login')
      .send({ email, password })
      .then(response => {
        if (response.body.error === false) {
          setMessage('Login successful');
          //route
        } else {
          setMessage('Invalid credentials');
        }
      })
      .catch(error => {
        console.error(error);
        setMessage('An error occurred during login');
      });
  };

  return (
    <div>
      <h1>Login</h1>
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      <p>{message}</p>
    </div>
  );
}

export default Login;

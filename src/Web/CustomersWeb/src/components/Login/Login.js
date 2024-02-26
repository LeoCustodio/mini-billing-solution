import React, { useState } from 'react';
import './Login.css'; // Import your CSS file for styling
import { Navigate } from "react-router-dom";

function LoginPage() {
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [redirect, setRedirect] = useState(false);


  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await fetch('http://localhost:8081/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      }).then(response => {
        if(response.ok){
          response.json().then(json => {
            localStorage.setItem('Authorization', json.token);
            setRedirect(true);
          })
        }
      });
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
        <div className="login-container">
        <h2>Mini-Billing Login</h2>
        <form onSubmit={handleSubmit}>
            <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            />
            <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            />
            {error && <div className="error">{error}</div>}
            <button type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
            {}
            </button>
        </form>
        {redirect === true ? (<Navigate to="/CustomerPage"/>) : null }
        </div>
  );
}

export default LoginPage;
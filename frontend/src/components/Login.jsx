import { useState } from 'react';
import '../css/Login.css';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simple validation - customize this as needed
    if (username === 'admin' && password === 'password') {
      setError('');
      onLogin();
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Login</h2>
        
        <div>
          <div className="input-group">
            <label className="input-label">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="input-field"
              placeholder="Enter username"
            />
          </div>

          <div className="input-group password">
            <label className="input-label">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
              placeholder="Enter password"
            />
          </div>

          {error && (
            <div className="error-message">{error}</div>
          )}

          <button onClick={handleSubmit} className="login-button">
            Login
          </button>
        </div>

        <div className="demo-text">
          Demo: username = "admin", password = "password"
        </div>
      </div>
    </div>
  );
}

export default Login;
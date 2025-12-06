import { useState} from 'react'
import '../css/Login.css';
const API = import.meta.env.VITE_API_URL;



function Login({onGoToOtp}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);



  const handleSubmit = async (yo) => {
    yo.preventDefault();
    setError('');
    setLoading(true);


    try {
      const res = await fetch(`${API}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })

      const trakData = await res.json();

      if (!res.ok) {
        setError(trakData.message || 'Login Failed Please try again');
      } else {
        localStorage.setItem('EmailPending', email)
        onGoToOtp();
      }
    } catch  {
      setError('Network issues')
    }
    
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Login</h2>
        
        <div>
          <div className="input-group">
            <label className="input-label">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field"
              placeholder="Enter email"
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

          <button 
            onClick={handleSubmit} 
            className="login-button"
            disabled={loading}
          >
            {loading ? "Sending OTP..." : "Login"}
          </button>
        </div>

        <div className="demo-text">
          Use your registered account to log in.
        </div>
      </div>
    </div>
  );
}
export default Login;
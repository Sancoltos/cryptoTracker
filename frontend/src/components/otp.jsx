import { useState} from 'react';


function OtpStuff({ onLoginGood}) {
const [otp, setOtp] = useState('');
const [error, setError] = useState('');


const emailCarry = localStorage.getItem('EmailPending');



const handleDaVerify = async () => {
    setError('');

    try {
        const res = await fetch('/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: emailCarry, otp })   
        })

        const trakData = await res.json();

        if (!res.ok) {
            setError(trakData.message || 'DID YOU GIVE US THE WRONG CODE?.....maybe not')
        } else {
            localStorage.setItem('token', trakData.token);
            localStorage.setItem('role', trakData.role);
            localStorage.removeItem('EmailPending')
            onLoginGood();
        }
    } catch {
        setError('Bad network')
    }
}

return(
    <div className="login-container">
      <h2>Enter OTP</h2>
      <p>We sent a code to {emailCarry}</p>
      <input
        type="text"
        value={otp}
        onChange={e => setOtp(e.target.value)}
        placeholder="6-digit code"
      />
      {error && <div className="error">{error}</div>}
      <button onClick={handleDaVerify}>Verify OTP</button>
    </div>
  );
}

export default OtpStuff;
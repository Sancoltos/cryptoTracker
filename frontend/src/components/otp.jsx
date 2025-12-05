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
      <div className="login-card">
      <h2 className="otp-title">Enter OTP</h2>
      <p className='emailNT'>We sent a code to {emailCarry}</p>
      <input
        type="text"
        value={otp}
        onChange={e => setOtp(e.target.value)}
        className="otpinput-field"
        placeholder="6-digit code"
      />
      {error && <div className="error">{error}</div>}
      <div className='otp-container'>
      <button className="otp-button" onClick={handleDaVerify}>Verify OTP</button>
      </div>
    </div>
    </div>
  );
}

export default OtpStuff;
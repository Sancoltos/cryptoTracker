import '../css/addCrypto.css';
import { useState } from 'react';
const API = import.meta.env.VITE_API_URL;




export default function AddCrypto({ onClose}) {

  const [name, setCryptoName] = useState('');
  const [symbol, setCryptoSymbol] = useState('');
  const [rank, setCryptoRank] = useState('');
  const [is_active, setIsActive] = useState(false);
  const [disabled, setDisabled] = useState(false);


  const handleSubmit = (e) => {
    e.preventDefault();
    setDisabled(true);
    const newCrypto = { name, symbol, rank, is_active };

const token = localStorage.getItem('token');
    fetch(`${API}/crypto`, {
      method: 'POST',
      headers:{ "Content-Type" : "application/json", "Authorization": `Bearer ${token}` },
      body: JSON.stringify(newCrypto)
    })
    .then((res) => {
      if(res.ok) {
        alert('Cryptocurrency added successfully!');
        window.location.href = '/';
        } else {
           return res.json().then((data) => {
            if (data.errors) {
              alert(data.errors.map(e => e.msg).join("\n"));
            } else {
              alert("Failed to add product");
            }
          });
        }
    
    })
    .catch(() => {
      alert('There is a network error silly goose!');
  })
 .finally(() => {
        setDisabled(false);
      });
  };

  return (
    
    <div className="addCrypto">
      <form onSubmit={handleSubmit} className="addCryptoForm">
        <h2>Add Cryptocurrency</h2>
        
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setCryptoName(e.target.value)} />
        </label>

        <label>
          Symbol:
          <input type="text" value={symbol} onChange={(e) => setCryptoSymbol(e.target.value)} />
        </label>

        <label>
          Rank:
          <input type="number" value={rank} onChange={(e) => setCryptoRank(e.target.value)} />
        </label>

        <label>
          Active:
          <input type="checkbox" checked={is_active} onChange={(e) => setIsActive(e.target.checked)} />
        </label>

        <button type="submit" disabled={disabled}>Add Crypto</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
}
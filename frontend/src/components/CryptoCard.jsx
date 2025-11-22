import React from "react";
import '../css/cryptoCard.css'


const CryptoCard = ({ crypto } = {}) => {
  if (!crypto) {
    return (
      <div className="crypto-card">
        <div className="crypto-info">
          <h3>No data</h3>
        </div>
      </div>
    );
  }

  return (
    <div className="crypto-card">
      <img src={`/path/to/icons/${crypto.symbol}.png`} alt={crypto.name} className="crypto-logo" />

      <div className="crypto-info">
        <h3>{crypto.name}</h3>
        <p className="symbol">{crypto.symbol}</p>
        <p className="rank">Rank: {crypto.rank}</p>
        <p className={`status ${crypto.is_active ? "active" : "inactive"}`}>
          {crypto.is_active ? "Active" : "Inactive"}
        </p>
      </div>
    </div>
  );
};

export default CryptoCard;
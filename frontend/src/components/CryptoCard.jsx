import React from "react";
import '../css/cryptoCard.css'
import { Star, Trash2 } from "lucide-react";


const CryptoCard = ({ crypto, isInWatchlist, onToggleWatchlist, onDelete, userEmail, userRole } = {}) => {
  if (!crypto) {
    return (
      <div className="crypto-card">
        <div className="crypto-info">
          <h3>No data</h3>
        </div>
      </div>
    );
  }

  const handleStarClick = (e) => {
    e.stopPropagation();
    if (onToggleWatchlist) {
      onToggleWatchlist(crypto.name);
    }
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    if (onDelete && window.confirm(`Are you sure you want to delete ${crypto.name}?`)) {
      onDelete(crypto.name);
    }
  };

  
  const normalizeEmail = (email) => email ? email.trim().toLowerCase() : '';
  const canDelete = userRole === 'admin' || (crypto.added_by && normalizeEmail(crypto.added_by) === normalizeEmail(userEmail));

  return (
    <div className="crypto-card">
      <button 
        className={`star-button ${isInWatchlist ? 'active' : ''}`}
        onClick={handleStarClick}
        aria-label={isInWatchlist ? 'Remove from watchlist' : 'Add to watchlist'}
      >
        <Star size={20} fill={isInWatchlist ? '#fbbf24' : 'none'} color={isInWatchlist ? '#fbbf24' : '#ffffff'} />
      </button>
      <img src={`/assets/${crypto.symbol}.png`} alt={crypto.name} className="crypto-logo" 
      onError={(e) => {
    e.currentTarget.src = "../assets/default.png";
  }}/>

      <div className="crypto-info">
        <h3>{crypto.name}</h3>
        <p className="symbol">{crypto.symbol}</p>
        <p className="rank">Rank: {crypto.rank}</p>
        <p className={`status ${crypto.is_active ? "active" : "inactive"}`}>
          {crypto.is_active ? "Active" : "Inactive"}
        </p>
      </div>
      
      {canDelete && (
        <button 
          className="delete-button"
          onClick={handleDeleteClick}
          aria-label="Delete cryptocurrency"
        >
          <Trash2 size={20} color="#ef4444" />
        </button>
      )}
    </div>
  );
};

export default CryptoCard;
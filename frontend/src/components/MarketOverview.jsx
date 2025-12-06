import { useState, useEffect } from "react";

import CryptoCard from "./CryptoCard";
import "../css/marketOverview.css";

export default function MarketOverview({ searchTerm, userEmail, userRole}) {

  const [cryptos, setCryptos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [watchlistItems, setWatchlistItems] = useState(new Set());

  const filtered = !searchTerm
    ? cryptos
    : cryptos.filter(c =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase())
      );

  const fetchWatchlist = () => {
    const token = localStorage.getItem('token');
    fetch('http://localhost:3000/watchlist?limit=100&page=1', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then((res) => res.json())
      .then((data) => {
        const watchlistNames = new Set(data.data.map(item => item.crypto_name));
        setWatchlistItems(watchlistNames);
      })
      .catch((err) => {
        console.error('Failed to fetch watchlist:', err);
      });
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch('http://localhost:3000/crypto?limit=50&page=1' ,{
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then((res) => res.json())
      .then((data) => {
        setCryptos(data.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
    
    fetchWatchlist();
  }, []);

  const handleToggleWatchlist = async (cryptoName) => {
    const token = localStorage.getItem('token');
    const isCurrentlyInWatchlist = watchlistItems.has(cryptoName);

    try {
      if (isCurrentlyInWatchlist) {
        // Remove from watchlist
        await fetch(`http://localhost:3000/watchlist/${encodeURIComponent(cryptoName)}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setWatchlistItems(prev => {
          const newSet = new Set(prev);
          newSet.delete(cryptoName);
          return newSet;
        });
      } else {
        // Add to watchlist
        await fetch('http://localhost:3000/watchlist', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ crypto_name: cryptoName })
        });
        setWatchlistItems(prev => new Set([...prev, cryptoName]));
      }
    } catch (err) {
      console.error('Failed to update watchlist:', err);
    }
  };

  const handleDelete = async (cryptoName) => {
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`http://localhost:3000/crypto/${encodeURIComponent(cryptoName)}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (res.ok) {
        // Remove from local state
        setCryptos(prev => prev.filter(c => c.name !== cryptoName));
        alert(`${cryptoName} deleted successfully.`);
      } else {
        const errorData = await res.json();
        alert(errorData.message || 'Failed to delete cryptocurrency');
      }
    } catch (err) {
      console.error('Failed to delete crypto:', err);
      alert('Network error, please try again later.');
    }
  };




if(loading) {
  return <p>Loading the stuff...</p>
}

if (error) {
  return <p>Failed to load cryptos</p>
}


  return (
    <div className="market-overview">
      {filtered.map(dude => (
        <CryptoCard 
          key={dude._id ?? dude.name} 
          crypto={dude} 
          isInWatchlist={watchlistItems.has(dude.name)}
          onToggleWatchlist={handleToggleWatchlist}
          onDelete={handleDelete}
          userEmail={userEmail}
          userRole={userRole}
        />
      ))}
    </div>
    
  );
};

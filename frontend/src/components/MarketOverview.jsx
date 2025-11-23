import { useState, useEffect } from "react";

import CryptoCard from "./CryptoCard";
import "../css/marketOverview.css";

export default function MarketOverview() {

  const [cryptos, setCryptos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3000/crypto?limit=50&page=1')
      .then((res) => res.json())
      .then((data) => {
        setCryptos(data.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

if(loading) {
  return <p>Loading the stuff...</p>
}

if (error) {
  return <p>Failed to load cryptos</p>
}


  return (
    <div className="market-overview">
      {cryptos.map(dude => (
        <CryptoCard key={dude._id ?? dude.name} crypto={dude} />
      
        
      ))}
    </div>
    
  );
};

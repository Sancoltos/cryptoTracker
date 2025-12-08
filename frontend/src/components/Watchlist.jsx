import { useState, useEffect } from "react";
import { Star, TrendingUp, X } from "lucide-react";
import "../css/watchlist.css";
const API = import.meta.env.VITE_API_URL;


export default function Watchlist() {
  const [coolWatch, setcoolWatch] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cryptoInfo, setCryptoInfo] = useState({});
  const [pricing, setPricing] = useState({});

  useEffect(() => {
    const token = localStorage.getItem('token');
 
    fetch(`${API}/watchlist?limit=100&page=1`, {

      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
       .then((res) => res.json())
      .then((data) => {

        setcoolWatch(data.data || []);
        setLoading(false);
        
 
        fetch(`${API}/crypto?limit=100&page=1`, {
          
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
          .then(res => res.json())
          .then(newRes => {
            const cryptoMap4000 = {};
            data.data.forEach(item => {
              const crypto = newRes.data.find(c => c.name === item.crypto_name);
              if (crypto) cryptoMap4000[item.crypto_name] = crypto;
              
            });
            setCryptoInfo(cryptoMap4000);
          })
              .catch(err => console.error('Failed to fetch crypto data:', err));

        const priceAddded = data.data.map(item =>
          fetch(`${API}/prices/${encodeURIComponent(item.crypto_name)}/daily`, {

            headers: {
              'Authorization': `Bearer ${token}`
            }

          })
            .then(res => {
               if (!res.ok) return null;
               return res.json();
        
              })
            
          .then(hohoho => ({ name: item.crypto_name, price: hohoho }))
            .catch(() => ({ name: item.crypto_name, price: null }))
        );



        Promise.all(priceAddded).then(results => {

          const priceMapper3000 = {};
          results.forEach(({ name, price }) => {
            priceMapper3000[name] = price;
          });
          setPricing(priceMapper3000);
        });
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);



  const getDateOut = async (cryptoName) => {
      const token = localStorage.getItem('token');
    
  try {

      await fetch(`${API}/watchlist/${encodeURIComponent(cryptoName)}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setcoolWatch(prev => prev.filter(item => item.crypto_name !== cryptoName));


    } catch(err) {
      console.error('couldnt removes!:', err);
    }
  };



  const thanksStackOverFlowForThis = (priceHAHA) => {
    if (!priceHAHA || !priceHAHA.close || !priceHAHA.open) return null;
    const change = ((priceHAHA.close - priceHAHA.open) / priceHAHA.open) * 100;
    return change.toFixed(2);
  };


  if (loading) {
    return <p>Loading watchlist...</p>;
  }

  if (error) {
    return <p>Failed to load watchlist</p>;
  }

  return (
  <div className="watchlist-container">
    <div className="watchlist-header">
      <Star size={20} fill="#fbbf24" color="#fbbf24" />
      <h2>Watchlist ({coolWatch.length})</h2>
    </div>
    
    <div className="watchlist-items">
      {coolWatch.length === 0 ? (
        <p className="empty-watchlist">
          Your watchlist is empty. Add cryptos from Market Overview!
        </p>
      ) : (
        coolWatch.map((item) => {
          const crypto = cryptoInfo[item.crypto_name];
          const price = pricing[item.crypto_name];
          const changer = thanksStackOverFlowForThis(price);
          const puckpuck = changer && parseFloat(changer) >= 0;

          return (
            <div key={item.id || item._id} className="watchlist-card">
              <img
                src={`/assets/${crypto?.symbol || 'BTC'}.png`}
                alt={crypto?.name || item.crypto_name}
                className="watchlist-logo"
              />

              <div className="watchlist-info">
                <h3>{crypto?.name || item.crypto_name}</h3>
                <p className="watchlist-symbol">{crypto?.symbol || ''}</p>
              </div>

              <div className="watchlist-price">
                <p className="price-value">
                  ${price?.close
                    ? price.close.toLocaleString('en-US', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                      })
                    : 'N/A'}
                </p>

                {changer && (
                  <div className={`price-change ${puckpuck ? 'positive' : 'negative'}`}>
                    <TrendingUp size={14} />
                    <span>{puckpuck ? '+' : ''}{changer}%</span>
                  </div>
                )}
              </div>

              <div className="watchlist-actions">
                <button className="view-button">View</button>
                <button
                  className="remove-button"
                  onClick={() => getDateOut(item.crypto_name)}
                  aria-label="Remove from watchlist"
                >
                  <X size={18} />
                </button>
              </div>
            </div>
          );
        })
      )}
    </div>
  </div>
);

}

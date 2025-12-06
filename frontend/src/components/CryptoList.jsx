import React from "react";
import "../css/cryptoList.css"
const CryptoList = ( { list } = {} ) => {
    if (!list) {
        return (
            <h3>No data</h3>
        )
    }


    return (
      
        <div className="crypto-list">
            <img 
                src={`/assets/${list.symbol}.png`} 
                alt={list.crypto_name} 
                className="crypto-logo"
                onError={(e) => e.target.style.display = 'none'}
            />
            <div className="crypto-info-list">
            <h3>{list.crypto_name}</h3>
            <p className="open">{list.open}</p>
            <p className="high">{list.high}</p>
            <p className="low">{list.low}</p>
            <p className="close">{list.close}</p>
            <p className="volume">{list.Volume}</p>
      </div>
        </div>
      
    )
}





export default CryptoList;
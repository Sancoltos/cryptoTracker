import { Search, TrendingUp } from 'lucide-react';
import "../css/Header.css"

export default function CryptoHeader({ onAddClick, onSearch }) {
   
  return (
    
    <header>
      <div className="logo">
        <TrendingUp />
        <h1>CryptoTrak</h1>
      </div>

      <div className="search">
        <Search />
        <input type="text" placeholder="Search cryptocurrencies..." onChange={(e) => onSearch(e.target.value)} />
      </div>
      <button className='addButton' onClick={onAddClick}>Add Crypto</button>
    </header>
  );
}
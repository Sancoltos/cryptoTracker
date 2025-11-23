import { Search, TrendingUp } from 'lucide-react';
import "../css/Header.css"
import AddCrypto from './AddCrypto';

export default function CryptoHeader({ onAddClick }) {
   
  return (
    
    <header>
      <div className="logo">
        <TrendingUp />
        <h1>CryptoTrak</h1>
      </div>

      <div className="search">
        <Search />
        <input type="text" placeholder="Search cryptocurrencies..." />
      </div>
      <button className='addButton' onClick={onAddClick}>Add Crypto</button>
    </header>
  );
}
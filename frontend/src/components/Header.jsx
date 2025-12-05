import { Search, TrendingUp } from 'lucide-react';
import "../css/Header.css"
import AddCrypto from './AddCrypto';
import DeleteCrypto from './DeleteCrypto';

export default function CryptoHeader({ onAddClick, onDeleteClick, onSearch }) {
   
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
      <button className='deleteButton' onClick={onDeleteClick}>Delete Crypto</button>
    </header>
  );
}
import { Search, TrendingUp } from 'lucide-react';
import "../css/Header.css"
import AddCrypto from './AddCrypto';
import DeleteCrypto from './DeleteCrypto';

export default function CryptoHeader({ onAddClick, onDeleteClick }) {
   
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
      <button className='deleteButton' onClick={onDeleteClick}>Delete Crypto</button>
    </header>
  );
}
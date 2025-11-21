import { Search, TrendingUp } from 'lucide-react';
import "../css/Header.css"

export default function CryptoHeader() {
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
    </header>
  );
}
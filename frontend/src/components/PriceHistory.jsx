import { useState, useEffect } from "react";
import CryptoList from "./CryptoList"
import "../css/cryptoList.css"
import { Search } from "lucide-react";



export default function PriceHistory({searchTerm}) {

const [listCryptos, setListCryptos] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);


const listFiltered = !searchTerm
  ? listCryptos
  : listCryptos.filter(c => 
    c.cryto_name.toLowerCase().includes(searchTerm.toLowerCase()));




  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch('http://localhost:3000/prices?limit=50&page=1', {
      headers: {
        'Authorization' : `Bearer ${token}`
      }
    })

    .then((res) => res.json())
    .then((data) => {
      setListCryptos(data.data);
      setLoading(false);
      console.log(data);
      
    })

    .catch((err) => {
      setError(err.message);
      setLoading(false);
    })
  }, [])


  if(loading) {
    return <p>loading the list</p>
  }


  if (error) {
    return <p>failed to load the list!</p>
  }
  
  return ( 
    <div className="crypto-list-container">
      <div className="crypto-list-header">
        <div>Logo</div>
        <div>Name</div>
        <div>Open</div>
        <div>High</div>
        <div>Low</div>
        <div>Close</div>
        <div>Volume</div>
      </div>
     {listFiltered.map(dude => (
      <CryptoList key={dude._id ?? dude.crypto_name} list={dude}/>
     ))}
    
      
    </div>
  )

  
}

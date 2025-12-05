import { useState } from 'react';
import MarketOverview from "../components/MarketOverview";
import PriceHistory from "../components/PriceHistory";
import Watchlist from "../components/Watchlist";
import "../css/TabNav.css"


export default function TabNavigator({searchTerm}) {
    const [page, setPage] = useState("Market Overview")


    return (
        <div className = "tab-box">
            <div className='tab-buttons'>
                <button className='button1' onClick={() => setPage("Market Overview")}>Market Overview </button>
                <button className='button2' onClick={() => setPage("Price History")}>Price History</button>
                <button className='button3' onClick={() => setPage("Watchlist")}>Watchlist</button>
            </div>

        {/* These are the pages for the tab nav and will load them below  */}
        <div  className = "pages"> 
        {page === "Market Overview" && <MarketOverview searchTerm={searchTerm} />}
        {page === "Price History" && <PriceHistory/>}
        {page === "Watchlist" && <Watchlist/>}
       </div>
        </div>
    )
}
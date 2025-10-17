
const fs = require('fs').promises;
const adamspath = require('path');
const dataPath = adamspath.resolve('data/watchlist.json');


const readData = async () => {
    const data = await fs.readFile(dataPath, 'utf8');


  return JSON.parse(data);
  };


const writeData = async (data) => {

  await fs.writeFile(dataPath, JSON.stringify(data, null, 2));
};




const fetchWatchlist = async () => {

  return await readData();
};

const fetchWatchByID = async (id) => {
  const watchlist = await readData();
  return watchlist.find(win => win.id === parseInt(id));

};





const addCrypWatchlist = async (cryptoName) => {
  const newWatchlist = await readData();
  const newId = newWatchlist.length > 0 ? Math.max(...newWatchlist.map(win => win.id)) + 1 : 1;
  
  const newItem = {
    id: newId,
    crypto_name: cryptoName,
    added_date: new Date().toISOString().split('T')[0]
    };
  
  newWatchlist.push(newItem);
  await writeData(newWatchlist);
  return newItem;

};



const removeCrypFromWatchlist = async (cryptoName) => {
  const watchlist = await readData();
  const index = watchlist.findIndex(win => win.crypto_name.toLowerCase() === cryptoName.toLowerCase());
  
  if (index === -1) return null;
  
  const deleted = watchlist.splice(index, 1)[0];
  await writeData(watchlist);
  return deleted;
};



module.exports = {
  fetchWatchlist,
  fetchWatchByID,
  addCrypWatchlist,
  removeCrypFromWatchlist
};
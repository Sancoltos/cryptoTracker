
const mongoose = require('mongoose');


const WatchSchema = new mongoose.Schema({
  
  id: Number,
  crypto_name: {type: String, required:true},
  added_date: Date

})


const WatchModeler = mongoose.model('Watch', WatchSchema);


const fetchWatchlist = () => WatchModeler.find();

 


const fetchWatchByID = async (id) => {
  return WatchModeler.find({id: parseInt(id)});

};



const addCrypWatchlist = async (cryptoName) => {
  const newWatchlist = await WatchModeler.find();
  const newId = newWatchlist.length > 0 ? Math.max(...newWatchlist.map(win => win.id)) + 1: 1;

  const myNewWatch = { 
    id: newId, 
    crypto_name: cryptoName, 
    added_date: new Date() 
  };

  return WatchModeler.create(myNewWatch);
};



const removeCrypFromWatchlist =  (cryptoName) => WatchModeler.findOneAndDelete({crypto_name: cryptoName})



module.exports = {
  WatchModeler,
  fetchWatchlist,
  fetchWatchByID,
  addCrypWatchlist,
  removeCrypFromWatchlist
};
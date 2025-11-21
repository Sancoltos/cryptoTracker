const mongoose = require('mongoose');


const CryptoSchema = new mongoose.Schema({
  id:Number,
  name: {type: String, required:true},
  symbol: {type: String, required:true},
  rank: Number,
  is_active: Boolean
})


const CryptoModel = mongoose.model("Crypto", CryptoSchema);

      //THis gets all the cryptos         All these below are the async functions to add, delete, and update cryptos that the user would like to add
const allCryptoFetch = () => CryptoModel.find();


// Get by name
const getCryptoByName = (name) => CryptoModel.findOne({name })


// This is search by name
const findCryptosName = (searchTerm) => {
  if (!searchTerm) return CryptoModel.find();
  return CryptoModel.find({name: searchTerm});
};


// This is to add a crypto that might not be there
const addACrypto = async (cryptoData) => {
  const cryptosWooh = await CryptoModel.find();
  const newId = cryptosWooh.length > 0 ? Math.max(...cryptosWooh.map(iluvU => iluvU.id)) + 1 : 1;
  const myNewCrypto = {...cryptoData, id: newId}
  return CryptoModel.create(myNewCrypto);
  
}

//pretty self explanatory just updates information
const updateCrypto =  (name, updateData) => 
 CryptoModel.findOneAndUpdate({name}, updateData, {new: true})




const deleteCrypto =  (name) => CryptoModel.findOneAndDelete({name})

module.exports = {
  CryptoModel,
  allCryptoFetch,
  getCryptoByName,
  findCryptosName,
  addACrypto,
  updateCrypto,
  deleteCrypto
};

/*sorry about the wacky variable names I just thought while im still at school I could
still pull it off haha. will update later when this is live for a while on github if 
I ever need to submit my repos as a portfolio  */
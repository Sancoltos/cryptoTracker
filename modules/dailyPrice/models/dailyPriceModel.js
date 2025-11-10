const mongoose = require('mongoose');


const DailySchema = new mongoose.Schema({
  id:Number,
  crypto_name: {type: String, required:true},
  date: Date,
  open: Number,
  high: Number,
  low: Number,
  close: Number,
  Volume: Number
 
})

const PriceModeler = mongoose.model('Daily', DailySchema);



const crypTeckdailyPrices = () => PriceModeler.find(); 



const dailyPriceIdFind =  (id) => {
    return PriceModeler.findOne({ id: parseInt(id)})

};



const priceHistory =  (cryptoName) => {
  return PriceModeler.find({ crypto_name: cryptoName})
};



const latestDailyPrice = async (cryptoName) => {
  const cryptoPrices = await PriceModeler.find({ crypto_name: cryptoName})
  
  if (cryptoPrices.length === 0) return null;
  

 cryptoPrices.sort((a, b) => new Date(b.date) - new Date(a.date));
 return cryptoPrices[0];

};




const newDailyPrice = async (priceData) => {
  const thesePrices = await PriceModeler.find();
  const newId = thesePrices.length > 0 ? Math.max(...thesePrices.map(p => p.id)) + 1 : 1;
  const myNewPrice = {...priceData, id:newId}
  return PriceModeler.create(myNewPrice)
}


const updateDailyPrice =  (id, updateData) => 
 PriceModeler.findOneAndUpdate({id}, updateData, {new: true})




const deleteDailyPrice =  (id) => PriceModeler.findOneAndDelete({id})






module.exports = {
  PriceModeler,
  crypTeckdailyPrices,
  dailyPriceIdFind,
  priceHistory,
  latestDailyPrice,
  newDailyPrice,
  updateDailyPrice,
  deleteDailyPrice
};
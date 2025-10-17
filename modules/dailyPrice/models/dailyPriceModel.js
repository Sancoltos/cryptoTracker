
const fs = require('fs').promises;
const path = require('path');
const dataPath = path.resolve('data/dailyPrices.json');


/**this section is basically the same as all the others and all other files moving forward will 
 * have similar logic
 */

const readData = async () => {
    const data = await fs.readFile(dataPath, 'utf8');

  return JSON.parse(data);
  };



const writeData = async (data) => {
  await fs.writeFile(dataPath, JSON.stringify(data, null, 2));
};



const crypTeckdailyPrices = async () => {
  return await readData();

};

const dailyPriceIdFind = async (id) => {
  const pricesFinder = await readData();
  return pricesFinder.find(yes => yes.id === parseInt(id));

};



const priceHistory = async (cryptoName) => {
  const pricesFinder = await readData();
  return pricesFinder.filter(hoho => hoho.crypto_name.toLowerCase() === cryptoName.toLowerCase());
};



const latestDailyPrice = async (cryptoName) => {
  const prices = await readData();
  const cryptoPrices = prices.filter(tt => tt.crypto_name.toLowerCase() === cryptoName.toLowerCase());
  
  if (cryptoPrices.length === 0) return null;
  

  return cryptoPrices.sort((a, b) => new Date(b.date) - new Date(a.date))[0];

};




const newDailyPrice = async (priceData) => {
  const thesePrices = await readData();
  const newId = thesePrices.length > 0 ? Math.max(...thesePrices.map(p => p.id)) + 1 : 1;
  

  const addNewPrice = {
    id: newId,
    crypto_name: priceData.crypto_name,
    date: priceData.date,
    open: priceData.open,
    high: priceData.high,
    low: priceData.low,
    close: priceData.close,
    volume: priceData.volume
  }
  
    thesePrices.push(addNewPrice);
      await writeData(thesePrices);
      return addNewPrice;


};



const updateDailyPrice = async (id, updateData) => {
  const soManyprices = await readData();
  const index = soManyprices.findIndex(hi => hi.id === parseInt(id));
  
    if (index === -1) return null;
  
  prices[index] = { ...prices[index], ...updateData };
    await writeData(prices);
    return prices[index];
}



const deleteDailyPrice = async (id) => {
  const thesePrices = await readData();
  const index = thesePrices.findIndex(hi => hi.id === parseInt(id));
  
    if (index === -1) return null;
  
  const deleted = thesePrices.splice(index, 1)[0];
    await writeData(thesePrices);
    return deleted;
};





module.exports = {
  crypTeckdailyPrices,
  dailyPriceIdFind,
  priceHistory,
  latestDailyPrice,
  newDailyPrice,
  updateDailyPrice,
  deleteDailyPrice
};
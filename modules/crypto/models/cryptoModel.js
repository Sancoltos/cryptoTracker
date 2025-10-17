
const fs = require('fs').promises;
const path = require('path');
const dataPath = path.resolve('data/cryptocurrencies.json');



//start of the main program. all things are wrapped in async so that there are no blocks with the server
const readData = async () => {
    const data = await fs.readFile(dataPath, 'utf8');

  return JSON.parse(data);
};



const writeData = async (data) => {
  await fs.writeFile(dataPath, JSON.stringify(data, null, 2));
};

      //THis gets all the cryptos         All these below are the async functions to add, delete, and update cryptos that the user would like to add
const allCryptoFetch = async () => {
  return await readData();
};


// Get by name
const getCryptoByName = async (name) => {
  const cryptos = await readData();

  return cryptos.find(crybro => crybro.name.toLowerCase() === name.toLowerCase());
};


// This is search by name
const findCryptosName = async (searchTerm) => {
  const cryptos = await readData();
  return cryptos.filter(crybro => crybro.name.toLowerCase().includes(searchTerm.toLowerCase()));
};


// This is to add a crypto that might not be there
const addACrypto = async (cryptoData) => {
  const cryptosWooh = await readData();
  const newId = cryptosWooh.length > 0 ? Math.max(...cryptosWooh.map(iluvU => iluvU.id)) + 1 : 1;
  

  //here we update the data with the new crypto
  const anotherCrypto = {
    id: newId,
    name: cryptoData.name,
    symbol: cryptoData.symbol,
    rank: cryptoData.rank,
    is_active: cryptoData.is_active
  };


  
  cryptosWooh.push(anotherCrypto);
    await writeData(cryptosWooh);
      return anotherCrypto;
};

//pretty self explanatory just updates information
const updateCrypto = async (name, updateData) => {
  const cryptos = await readData();
  const index = cryptos.findIndex(updateCrybro => updateCrybro.name.toLowerCase() === name.toLowerCase());
  
  if (index === -1) return null;
  
  cryptos[index] = { ...cryptos[index], ...updateData };
  await writeData(cryptos);
  return cryptos[index];
};


const deleteCrypto = async (name) => {
  const cryptos = await readData();
  const index = cryptos.findIndex(deleteCrybro => deleteCrybro.name.toLowerCase() === name.toLowerCase());
  
  if (index === -1) return null;
  
  const deleted = cryptos.splice(index, 1)[0];
  await writeData(cryptos);
  return deleted;
};

module.exports = {
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
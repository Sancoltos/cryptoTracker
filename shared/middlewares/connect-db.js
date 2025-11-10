const adamsMongoose = require('mongoose');


const DB_URL = process.env.DB_URL;


async function connectTrak(req,res,next) {
   
    try {
        await adamsMongoose.connect(DB_URL, { dbName: "CryptoTrackerData"});
        console.log("Your database has connected");
        next();
    } catch (error) {
        console.log("Database Connection failed");
        console.log(error);
    }
}


module.exports = connectTrak;

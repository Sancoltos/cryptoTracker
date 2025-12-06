require('dotenv').config();
const mongoose = require('mongoose');
const CTUser = require('./modules/user/models/userModel');

const DB_URL = process.env.DB_URL;

async function main() {
  try {
    await mongoose.connect(DB_URL, { dbName: 'CryptoTrackerData' });
    console.log('DB connected');

    const email = 'adamwalters121@gmail.com';      // <- use whatever you want
    const password = 'Kazper1211!';        // <- the login password

    let user = await CTUser.findOne({ email });

    if (!user) {
      user = new CTUser({ email, role: 'admin' });
      console.log('Creating new user...');
    } else {
      console.log('Updating existing user password...');
    }

    await user.setPassword(password);   // <- this uses bcrypt properly
    await user.save();

    console.log('User saved: ', email);
  } catch (err) {
    console.error('Error seeding user:', err);
  } finally {
    await mongoose.disconnect();
    console.log('DB disconnected');
  }
}

main();

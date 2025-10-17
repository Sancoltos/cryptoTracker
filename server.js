const express = require('express');
const app = express();
const PORT = 3000;
const cryptoRoutes = require('./modules/crypto/routes/cryptoRoutes');
const dailyPriceRoutes = require('./modules/dailyPrice/routes/dailyPriceRoutes');
const watchlistRoutes = require('./modules/watchlist/routes/watchlistRoutes');




app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use('/crypto', cryptoRoutes);
app.use('/prices', dailyPriceRoutes);  
app.use('/watchlist', watchlistRoutes);



app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});


app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(500).json({ message: 'Server error' });
});



app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
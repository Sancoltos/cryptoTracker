const express = require('express');

const app = express();
const PORT = 3000;

app.use(express.json());


//Get all crypto prices
app.get('/crypto', (req, res) => {
  res.json({ message: 'Get all cryptocurrencies - dummy' });
});

app.get('/crypto/search/:name', (req, res) => {
  res.json({ message: 'Search cryptocurrency by name - dummy response' });
});

app.get('/crypto/:name/history', (req, res) => {
  res.json({ message: 'get price history' });
});


app.get('/crypto/:name/daily', (req, res) => {
 res.json({ message: 'get daily price'})
})

//post stuff

app.post('/crypto', (req, res) => {
    res.json({ message: 'Add a new crypto'})
});


//put stuff

app.put('/crypto/:name', (req, res) => {
    res.json({ message: 'update a crypto'})
})

//Delete

app.delete('/crypto/:name', (req, res) => {
    res.json({ message: 'Deleted crypto'})
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
const express = require('express');
const router3 = express.Router();
const watchlistModel = require('../models/watchlistModel');
const { validatorAddToWatchlist, handleValidation } = require('../middlewares/watchlistValidation');




router3.get('/', async (req, res, next) => {

  try {
    const watchlist = await watchlistModel.fetchWatchlist();
    res.status(200).json(watchlist);

  } catch (error) {
    next(error);
  }
  }
);



router3.get('/:id', async (req, res, next) => {

  try {
    const item = await watchlistModel.fetchWatchByID(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found in waatchlist' });
    }
    res.status(200).json(item);

  } catch (error) {
    next(error);
  }

});



router3.post('/', validatorAddToWatchlist, handleValidation, async (req, res, next) => {

  try {
    const newItem = await watchlistModel.addCrypWatchlist(req.body.crypto_name);
    res.status(201).json(newItem);

    } catch (error) {
      next(error);
  }
});



router3.delete('/:name', async (req, res, next) => {

  try {
    const deleted = await watchlistModel.removeCrypFromWatchlist(req.params.name);
    if (!deleted) {
      return res.status(404).json({ message: 'Not found 404 wins again' });
    }
    res.status(200).json(deleted);

  } catch (error) {
    next(error);
  }
}

);



module.exports = router3;
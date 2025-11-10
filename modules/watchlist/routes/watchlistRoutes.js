const express = require('express');
const router3 = express.Router();
const watchlistModel = require('../models/watchlistModel');
const { validatorAddToWatchlist, handleValidation } = require('../middlewares/watchlistValidation');




router3.get('/', async (req, res, next) => {

  try {
    let search = req.query.search || "";

   
    const count = await watchlistModel.WatchModeler.countDocuments({
      crypto_name: search
    });

    if (!count || count <= 0) {
      return res.send({ count: 0, page: 1, data: [] });
    }

    const sort_by = req.query.sort_by || "added_date";
    const sort_order = req.query.sort_order === "asc" ? 1 : -1;

    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;

    

    const watchlist = await watchlistModel.WatchModeler.find(
      { crypto_name: search },
      {},
      {
        limit,
        skip: (page - 1) * limit,
        sort: { [sort_by]: sort_order },
      }
    );

    res.json({
      count,
      page,
      limit,
      data: watchlist,
    });

  } catch (error) {
    next(error);
  }
});



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
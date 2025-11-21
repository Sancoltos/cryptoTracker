const express = require('express');
const router2 = express.Router();
const dailyPriceModel = require('../models/dailyPriceModel');
const { validationCreateDaily, validationUpdateDaily, handleValidation } = require('../middlewares/dailyPriceValidation');




router2.get('/', async (req, res, next) => {
  
  try {
      let search = req.query.search || "";

      const count = await dailyPriceModel.PriceModeler.countDocuments({
        crypto_name: search
      })

      if (!count || count <= 0) {
        return res.send({ count: 0, page: 1, data: []})
      }

      const sort_by = req.query.sort_by || "date";
    const sort_order = req.query.sort_order === "asc" ? 1 : -1;

    
    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;

    
    const getDemPrices = await dailyPriceModel.DailyModel.find(
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
      data: getDemPrices,
    });

  } catch (error) {
    next(error);
  }
});



router2.get('/:name/history', async (req, res, next) => {
  
  try {
    const crypTeckhistory = await dailyPriceModel.priceHistory(req.params.name);
      if (crypTeckhistory.length === 0) {
        return res.status(404).json({ message: 'We didnt find any price history' });
    
      }
    res.status(200).json(crypTeckhistory);
  
  } catch (error) {
    next(error);
  }

});




router2.get('/:name/daily', async (req, res, next) => {
  try {
    const crypTeckDaily = await dailyPriceModel.latestDailyPrice(req.params.name);
    if (!crypTeckDaily) {
      return res.status(404).json({ message: 'cannot find the daily price' });
    }
    res.status(200).json(crypTeckDaily);
  } catch (error) {
    next(error);
  }
  }
);




router2.post('/', validationCreateDaily, handleValidation, async (req, res, next) => {
  
  try {
    const newPrice = await dailyPriceModel.newDailyPrice(req.body);
    res.status(201).json(newPrice);

  } catch (error) {
    next(error);
  }
}
);



router2.put('/:id', validationUpdateDaily, handleValidation, async (req, res, next) => {
    
  try {
      const updated = await dailyPriceModel.updateDailyPrice(req.params.id, req.body);
      if (!updated) {
        return res.status(404).json({ message: 'cannot find the daily pricee' });
      }
      res.status(200).json(updated);

    } catch (error) {
       next(error);
  }
}
);


router2.delete('/:id', async (req, res, next) => {
  try {
    const deleted = await dailyPriceModel.deleteDailyPrice(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'cannot find  daily price' });
    }
    res.status(200).json(deleted);

  } catch (error) {
    next(error);

  }

});



module.exports = router2;
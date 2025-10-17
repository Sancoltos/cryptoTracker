const express = require('express');
const bbRouter = express.Router();
const cryptoModel = require('../models/cryptoModel');
const { validationCreateCryptek, validationUpdateCryptek, adamsErrorHandler } = require('../middlewares/cryptoValidation');

/*here we have all the rest api endpoints for the project
if everything works ok we get a a 200 status code and for some
if the thing is not found like with the find it returns a 404 */

bbRouter.get('/', async (req, res, next) => {
  try {
    const crypto = await cryptoModel.allCryptoFetch();
    res.status(200).json(crypto);

  } catch (error) {
    next(error);
  }

});




bbRouter.get('/search/:name', async (req, res, next) => {
  try {
    const results = await cryptoModel.findCryptosName(req.params.name);
    res.status(200).json(results);

  } catch (error) {
      next(error);
  }

});



bbRouter.get('/:name', async (req, res, next) => {
  try {
    const crypto = await cryptoModel.getCryptoByName(req.params.name);
    if (!crypto) {
      return res.status(404).json({ message: ' Sorry my dude no cryptocurrency not found' });
    }
    res.status(200).json(crypto);
  } catch (error) {
    next(error);

  }
}
);


bbRouter.post('/', validationCreateCryptek, adamsErrorHandler, async (req, res, next) => {
  try {
    const newCrypto = await cryptoModel.addACrypto(req.body);
    res.status(201).json(newCrypto);

  } catch (error) {
    next(error);

  }
});




bbRouter.put('/:name', validationUpdateCryptek, adamsErrorHandler, async (req, res, next) => {
  try {
    const updated = await cryptoModel.updateCrypto(req.params.name, req.body);
    if (!updated) {
      return res.status(404).json({ message: 'Couldnt find it sorry' });
    }
    res.status(200).json(updated);

  } catch (error) {
    next(error);
  }
});



bbRouter.delete('/:name', async (req, res, next) => {
  try {
    const deleted = await cryptoModel.deleteCrypto(req.params.name);
    if (!deleted) {
      return res.status(404).json({ message: 'Cryptocurrency not found' });
      }
    res.status(200).json(deleted);

  } catch (error) {
    next(error);
  }
}
);




module.exports = bbRouter;
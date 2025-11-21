const { body, validationResult } = require('express-validator');

/**this is my middleware that makes sure that incoming data is correct */


const validationCreateCryptek = [
  body('name').notEmpty().withMessage('Name is need here silly'),
  body('symbol').notEmpty().withMessage('a symbol is needed as well')
];

const validationUpdateCryptek = [
  body('name').optional().notEmpty().withMessage('Name is need here silly'),
  body('symbol').optional().notEmpty().withMessage('a symbol is needed as well')
];


const adamsErrorHandler = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
  }

    next();
};



module.exports = {
  validationCreateCryptek,
  validationUpdateCryptek,
  adamsErrorHandler
};
const { body, validationResult } = require('express-validator');

const validatorAddToWatchlist = [
  body('crypto_name').notEmpty().withMessage('Crypto name is required')
];

const handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
  validatorAddToWatchlist,
  handleValidation
};
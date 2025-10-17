

const { body, validationResult } = require('express-validator');

const validationCreateDaily = [
  body('crypto_name').notEmpty().withMessage('Crypto name is needed'),
  body('date').notEmpty().withMessage('Date is needed'),
  body('open').notEmpty().withMessage('Open price is needed'),
  body('high').notEmpty().withMessage('High price is needed'),
  body('low').notEmpty().withMessage('Low price is needed'),
  body('close').notEmpty().withMessage('Close price is needed')
];


const validationUpdateDaily = [
  body('open').optional().notEmpty().withMessage('Open price cannot be blank'),
  body('high').optional().notEmpty().withMessage('High price cannot be blank'),
  body('low').optional().notEmpty().withMessage('Low price cannot be blank'),
  body('close').optional().notEmpty().withMessage('Close price cannot be blank')
];



const handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
  validationCreateDaily,
  validationUpdateDaily,
  handleValidation

};
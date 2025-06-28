const { body, validationResult } = require('express-validator');

// Validation middleware
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array()
    });
  }
  next();
};

// User validation rules
const validateUserRegistration = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Password must contain at least one lowercase letter, one uppercase letter, and one number'),
  handleValidationErrors
];

const validateUserLogin = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .notEmpty()
    .withMessage('Password is required'),
  handleValidationErrors
];

// Product validation rules
const validateProduct = [
  body('productName')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Product name must be between 2 and 100 characters'),
  body('modelNumber')
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage('Model number is required and must be less than 50 characters'),
  body('purchaseDate')
    .isISO8601()
    .withMessage('Please provide a valid purchase date'),
  body('customerEmail')
    .optional()
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid customer email'),
  handleValidationErrors
];

// Service validation rules
const validateService = [
  body('productId')
    .isMongoId()
    .withMessage('Please provide a valid product ID'),
  body('nextServiceDate')
    .isISO8601()
    .withMessage('Please provide a valid service date'),
  handleValidationErrors
];

module.exports = {
  validateUserRegistration,
  validateUserLogin,
  validateProduct,
  validateService,
  handleValidationErrors
};
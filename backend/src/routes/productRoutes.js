const express = require('express');
const router = express.Router();
const {
  getUserProducts,
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getProductsByUser
} = require('../controllers/productController');
const { authenticateToken, requireAdmin } = require('../middleware/auth');
const { validateProduct } = require('../utils/validation');

// User routes
router.get('/my-products', authenticateToken, getUserProducts);
router.get('/:id', authenticateToken, getProduct);

// Admin routes
router.post('/', authenticateToken, requireAdmin, validateProduct, addProduct);
router.put('/:id', authenticateToken, requireAdmin, updateProduct);
router.delete('/:id', authenticateToken, requireAdmin, deleteProduct);
router.get('/', authenticateToken, requireAdmin, getAllProducts);
router.get('/user/:userId', authenticateToken, requireAdmin, getProductsByUser);

module.exports = router;
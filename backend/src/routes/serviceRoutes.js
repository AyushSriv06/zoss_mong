const express = require('express');
const router = express.Router();
const {
  getUserServices,
  getServicesDueSoon,
  completeService,
  getAllServices,
  updateService,
  getServicesByUser,
  getOverdueServices
} = require('../controllers/serviceController');
const { authenticateToken, requireAdmin } = require('../middleware/auth');

// User routes
router.get('/my-services', authenticateToken, getUserServices);
router.get('/due-soon', authenticateToken, getServicesDueSoon);
router.put('/:id/complete', authenticateToken, completeService);

// Admin routes
router.get('/', authenticateToken, requireAdmin, getAllServices);
router.put('/:id', authenticateToken, requireAdmin, updateService);
router.get('/user/:userId', authenticateToken, requireAdmin, getServicesByUser);
router.get('/overdue', authenticateToken, requireAdmin, getOverdueServices);

module.exports = router;
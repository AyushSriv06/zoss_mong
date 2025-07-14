const express = require('express');
const router = express.Router();
const {
  createServiceRequest,
  getUserServices,
  getServicesDueSoon,
  completeService,
  getPendingServiceRequests,
  approveServiceRequest,
  getAllServices,
  updateService,
  getServicesByUser,
  getOverdueServices
} = require('../controllers/serviceController');
const { authenticateToken, requireAdmin } = require('../middleware/auth');

// User routes
router.post('/request', authenticateToken, createServiceRequest);
router.get('/my-services', authenticateToken, getUserServices);
router.get('/due-soon', authenticateToken, getServicesDueSoon);
router.put('/:id/complete', authenticateToken, completeService);

// Admin routes
router.get('/pending', authenticateToken, requireAdmin, getPendingServiceRequests);
router.put('/:id/approve', authenticateToken, requireAdmin, approveServiceRequest);
router.get('/', authenticateToken, requireAdmin, getAllServices);
router.put('/:id', authenticateToken, requireAdmin, updateService);
router.get('/user/:userId', authenticateToken, requireAdmin, getServicesByUser);
router.get('/overdue', authenticateToken, requireAdmin, getOverdueServices);

module.exports = router;
const express = require('express');
const router = express.Router();
const {
  getAdminUpdates,
  createAdminUpdate,
  updateAdminUpdate,
  deleteAdminUpdate,
  getDashboardStats,
  getPendingApprovals,
  approveProduct
} = require('../controllers/adminController');
const { authenticateToken, requireAdmin } = require('../middleware/auth');

// All routes require admin authentication
router.use(authenticateToken, requireAdmin);

// Product templates (AdminUpdate) routes
router.get('/product-templates', getAdminUpdates);
router.post('/product-templates', createAdminUpdate);
router.put('/product-templates/:id', updateAdminUpdate);
router.delete('/product-templates/:id', deleteAdminUpdate);

// Dashboard and management routes
router.get('/dashboard-stats', getDashboardStats);
router.get('/pending-approvals', getPendingApprovals);
router.put('/approve-product/:id', approveProduct);

module.exports = router;
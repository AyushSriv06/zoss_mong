const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  changePassword,
  getAllUsers
} = require('../controllers/userController');
const { authenticateToken, requireAdmin } = require('../middleware/auth');
const { validateUserRegistration, validateUserLogin } = require('../utils/validation');

// Public routes
router.post('/register', validateUserRegistration, registerUser);
router.post('/login', validateUserLogin, loginUser);

// Protected routes
router.get('/profile', authenticateToken, getUserProfile);
router.put('/profile', authenticateToken, updateUserProfile);
router.put('/change-password', authenticateToken, changePassword);

// Admin routes
router.get('/all', authenticateToken, requireAdmin, getAllUsers);

module.exports = router;
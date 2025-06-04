const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { verifyAdminToken } = require('../authentication/adminAuth');

// @route   POST /api/admin/login
// @desc    Admin login
// @access  Public
router.post('/login', adminController.loginAdmin);

// @route   GET /api/admin/dashboard
// @desc    Example protected admin route
// @access  Private (Admin Only)
router.get('/dashboard', verifyAdminToken, adminController.getAdminDashboard);

// @route   POST /api/admin/register
// @desc    Register a new admin
// @access  Public (for now - SHOULD BE PROTECTED IN PRODUCTION)
router.post('/register', adminController.registerAdmin);

// You can add more admin-specific routes here
// For example, managing users, settings, etc.
// router.get('/users', verifyAdminToken, adminController.getAllUsers);
// router.put('/settings', verifyAdminToken, adminController.updateSettings);

module.exports = router;
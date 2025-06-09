const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { verifyAdminToken } = require('../authentication/adminAuth');

router.post('/login', adminController.loginAdmin);

router.get('/dashboard', verifyAdminToken, adminController.getAdminDashboard);

router.post('/register', adminController.registerAdmin);

module.exports = router;
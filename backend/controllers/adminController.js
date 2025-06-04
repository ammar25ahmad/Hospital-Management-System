const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const secret = process.env.JWT_SECRET;

// Login Admin
const loginAdmin = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required.' });
    }

    try {
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(401).json({ message: 'Invalid email or password.' });
        }

        // Compare plaintext password
        if (admin.password !== password) {
            return res.status(401).json({ message: 'Invalid email or password.' });
        }

        // Credentials are correct, generate a token
        const payload = {
            id: admin._id,
            email: admin.email,
            name: admin.name,
            role: admin.role || 'admin',  //Ensure role is included
        };
        const token = jwt.sign(payload, secret, { expiresIn: '1m' }); // Token expires in 1 hour
        res.json({
            message: 'Admin login successful',
            token, // Send token in response body
            admin: {
                id: admin._id,
                email: admin.email,
                name: admin.name,
            }
        });

    } catch (error) {
        console.error('Admin login error:', error);
        res.status(500).json({ message: 'Server error during admin login.' });
    }
};

// Example protected route logic (can be expanded)
const getAdminDashboard = (req, res) => {
    // req.admin is populated by the verifyAdminToken middleware
    // In a real application, you would fetch this data from your database
    const dashboardStats = {
        newPatientsCount: 15, // Example data
        doctorsCount: 48,     // Example data
        operationsCount: 7,   // Example data
        income: "1350000 Rs.", // Example data
        // You can add more stats as needed
    };

    res.json({
        message: `Welcome to the admin dashboard, ${req.admin.name || req.admin.email}!`,
        admin: req.admin, // Send back the admin data from token
        ...dashboardStats // Spread the dashboard stats into the response
    });
};

// Register a new Admin
const registerAdmin = async (req, res) => {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Name, email, and password are required.' });
    }

    try {
        // Check if admin already exists
        let admin = await Admin.findOne({ email });
        if (admin) {
            return res.status(400).json({ message: 'Admin with this email already exists.' });
        }

        // Password is now stored in plaintext
        // Create new admin instance
        admin = new Admin({
            name,
            email,
            password: password, // Save the plaintext password
            role: role || 'admin', // Default to 'admin' if role not provided
        });

        await admin.save();
        // Optionally, generate a token and log them in directly, or just send success
        // For simplicity, just sending success message for registration
        res.status(201).json({ message: 'Admin registered successfully.', adminId: admin._id });

    } catch (error) {
        console.error('Admin registration error:', error);
        if (error.code === 11000) { // Duplicate key error (for email)
            return res.status(400).json({ message: 'Admin with this email already exists.' });
        }
        res.status(500).json({ message: 'Server error during admin registration.' });
    }
};

module.exports = {
    loginAdmin,
    getAdminDashboard,
    registerAdmin,
};
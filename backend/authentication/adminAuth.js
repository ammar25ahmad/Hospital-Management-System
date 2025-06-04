const jwt = require('jsonwebtoken');
require('dotenv').config();

const secret = process.env.JWT_SECRET;

const verifyAdminToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1]; // Expects "Bearer <token>"

        if (!token) {
            // No token found after "Bearer "
            return res.status(401).json({ message: 'No token provided.' });
        }

        jwt.verify(token, secret, (err) => {
            if (err) {
                if (err.name === 'TokenExpiredError') {
                    return res.status(401).json({ message: 'Token expired. Please log in again.' });
                }
                if (err.name === 'JsonWebTokenError') {
                    return res.status(403).json({ message: 'Invalid token.' });
                }
                return res.status(403).json({ message: 'Failed to authenticate token.' });
            }

            // Check if the decoded token has an admin role or necessary identifier
            // if (decoded.role !== 'admin') { // Ensure the token signifies an admin user
            //     return res.status(403).json({ message: 'Access denied. Admin privileges required.' });
            // }

            // req.admin = decoded; // Add decoded admin info to the request object
            next();
        });
    } else {
        // No Authorization header found
        res.status(401).json({ message: 'Authorization header missing. No token provided.' });
    }
};

module.exports = {
    verifyAdminToken,
};

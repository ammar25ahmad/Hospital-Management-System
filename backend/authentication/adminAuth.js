const jwt = require("jsonwebtoken");
require("dotenv").config();

const secret = process.env.JWT_SECRET;

// Middleware function to verify admin token
const verifyAdminToken = (req, res, next) => {
  // Get the authorization header from the request
  const authHeader = req.headers.authorization;

  // Check if the authorization header exists
  if (authHeader) {
    // Extract the token from the authorization header
    const token = authHeader.split("Bearer ")[1]; // Expects "Bearer <token>"

    if (!token) {
      // No token found after "Bearer "
      return res.status(401).json({ message: "No token provided." });
    }

    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          return res
            .status(401)
            .json({ message: "Token expired. Please log in again." });
        }
        if (err.name === "JsonWebTokenError") {
          return res.status(403).json({ message: "Invalid token." });
        }
        return res
          .status(403)
          .json({ message: "Failed to authenticate token." });
      }

      // Check if the decoded token has an admin role or necessary identifier
      if (!decoded || decoded.role !== "admin") {
        // Ensure the token signifies an admin user and is decoded
        return res
          .status(403)
          .json({
            message:
              "Access denied. Admin privileges required or token invalid.",
          });
      }

      req.admin = decoded; // Add decoded admin info to the request object
      next();
    });
  } else {
    // No Authorization header found
    res
      .status(401)
      .json({ message: "Authorization header missing. No token provided." });
  }
};

module.exports = {
  verifyAdminToken,
};

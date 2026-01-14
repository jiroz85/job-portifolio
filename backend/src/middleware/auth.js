const jwt = require("jsonwebtoken");

// Simple authentication middleware
// In production, you'd want to use a more robust solution
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({
      success: false,
      error: "Access token required",
    });
  }

  jwt.verify(
    token,
    process.env.JWT_SECRET || "job-portal-secret-key-2024-hp",
    (err, user) => {
      if (err) {
        return res.status(403).json({
          success: false,
          error: "Invalid or expired token",
        });
      }

      req.user = user;
      next();
    }
  );
};

// Role-based authorization middleware
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: "Authentication required",
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        error: "Insufficient permissions",
      });
    }

    next();
  };
};

// Simple token generation for testing
const generateToken = (payload) => {
  return jwt.sign(
    payload,
    process.env.JWT_SECRET || "job-portal-secret-key-2024-hp",
    {
      expiresIn: "24h",
    }
  );
};

module.exports = {
  authenticateToken,
  authorize,
  generateToken,
};

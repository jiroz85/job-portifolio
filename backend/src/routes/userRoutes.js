const express = require("express");
const {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  updateUserRole,
  updateUserStatus,
  getUserStatistics,
  getUserActivity,
} = require("../controllers/userController");
const { authenticateToken, authorize } = require("../middleware/auth");

const router = express.Router();

// Apply authentication middleware to all routes
router.use(authenticateToken);

// Get all users with pagination and filtering (admin only)
router.get("/", authorize("admin"), getAllUsers);

// Get user statistics (admin only)
router.get("/statistics", authorize("admin"), getUserStatistics);

// Get user activity (admin only)
router.get("/:id/activity", authorize("admin"), getUserActivity);

// Get user by ID (admin only)
router.get("/:id", authorize("admin"), getUserById);

// Update user (admin only)
router.put("/:id", authorize("admin"), updateUser);

// Update user role (admin only)
router.put("/:id/role", authorize("admin"), updateUserRole);

// Update user status (admin only)
router.put("/:id/status", authorize("admin"), updateUserStatus);

// Delete user (admin only)
router.delete("/:id", authorize("admin"), deleteUser);

module.exports = router;

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

const router = express.Router();

// Get all users with pagination and filtering
router.get("/", getAllUsers);

// Get user statistics
router.get("/statistics", getUserStatistics);

// Get user activity
router.get("/:id/activity", getUserActivity);

// Get user by ID
router.get("/:id", getUserById);

// Update user
router.put("/:id", updateUser);

// Update user role
router.put("/:id/role", updateUserRole);

// Update user status
router.put("/:id/status", updateUserStatus);

// Delete user
router.delete("/:id", deleteUser);

module.exports = router;

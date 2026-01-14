const express = require("express");
const {
  logAction,
  getAuditLogs,
  getUserActivity,
  getSystemStats,
  exportLogs,
} = require("../controllers/auditController");
const { authenticateToken, authorize } = require("../middleware/auth");

const router = express.Router();

// Apply authentication middleware to all routes
router.use(authenticateToken);

// Log admin action for audit trail
router.post("/log", authorize("admin"), logAction);

// Get audit logs for admin dashboard
router.get("/logs", authorize("admin"), getAuditLogs);

// Get user activity history
router.get("/user/:userId/activity", authorize("admin"), getUserActivity);

// Get system statistics
router.get("/stats", authorize("admin"), getSystemStats);

// Export audit logs
router.get("/export", authorize("admin"), exportLogs);

module.exports = router;

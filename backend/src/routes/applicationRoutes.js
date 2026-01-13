const express = require("express");
const router = express.Router();
const { authenticateToken, authorize } = require("../middleware/auth");
const {
  getApplications,
  getApplication,
  createApplication,
  updateApplicationStatus,
  deleteApplication,
  getApplicationsByEmail,
} = require("../controllers/applicationController");

// Public routes
router.post("/", createApplication); // Submit application (public)
router.get("/email/:email", getApplicationsByEmail); // Get applications by email (public for applicants)

// Protected routes - require authentication
router.use(authenticateToken); // Apply auth middleware to all routes below

// Employer/Admin only routes
router.get("/", authorize("employer", "admin"), getApplications); // Get all applications
router.get("/:id", authorize("employer", "admin"), getApplication); // Get single application
router.put(
  "/:id/status",
  authorize("employer", "admin"),
  updateApplicationStatus
); // Update application status
router.delete("/:id", authorize("admin"), deleteApplication); // Delete application (admin only)

module.exports = router;

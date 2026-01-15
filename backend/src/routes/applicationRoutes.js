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
  verifyEmail,
} = require("../controllers/applicationController");

// Protected routes - require authentication
router.use(authenticateToken); // Apply auth middleware to all routes below

// Authenticated user routes
router.post("/", authorize("jobseeker", "user", "admin"), createApplication); // Submit application (requires authenticated user - jobseeker, user, or admin role)
router.get("/email/:email", getApplicationsByEmail); // Get applications by email (for authenticated users)
router.get("/verify/:token", verifyEmail); // Email verification (public - still needed for email links)

// Employer/Admin only routes
router.get("/", authorize("employer", "admin"), getApplications); // Get all applications
router.get("/:id", authorize("employer", "admin"), getApplication); // Get single application
router.put(
  "/:id/status",
  authorize("employer", "admin"),
  updateApplicationStatus
); // Update application status
router.patch(
  "/:id/status",
  authorize("employer", "admin"),
  updateApplicationStatus
); // Update application status
router.delete("/:id", authorize("admin"), deleteApplication); // Delete application (admin only)

module.exports = router;

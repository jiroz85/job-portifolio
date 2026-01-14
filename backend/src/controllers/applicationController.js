const Application = require("../models/Application");
const Job = require("../models/Job");

// Get all applications (for employers/admins)
const getApplications = async (req, res) => {
  try {
    const { jobId, status, page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    const whereClause = {};
    if (jobId) whereClause.jobId = jobId;
    if (status) whereClause.status = status;

    const applications = await Application.findAndCountAll({
      where: whereClause,
      include: [
        {
          model: Job,
          as: "job",
          attributes: ["id", "title", "company", "location"],
        },
      ],
      order: [["applicationDate", "DESC"]],
      limit: parseInt(limit),
      offset: parseInt(offset),
    });

    res.json({
      success: true,
      data: applications.rows,
      pagination: {
        total: applications.count,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(applications.count / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching applications:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch applications",
    });
  }
};

// Get single application by ID
const getApplication = async (req, res) => {
  try {
    const { id } = req.params;

    const application = await Application.findByPk(id, {
      include: [
        {
          model: Job,
          as: "job",
          attributes: [
            "id",
            "title",
            "company",
            "location",
            "description",
            "requirements",
          ],
        },
      ],
    });

    if (!application) {
      return res.status(404).json({
        success: false,
        error: "Application not found",
      });
    }

    res.json({
      success: true,
      data: application,
    });
  } catch (error) {
    console.error("Error fetching application:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch application",
    });
  }
};

// Create new application (submit job application)
const createApplication = async (req, res) => {
  try {
    const {
      jobId,
      applicantName,
      applicantEmail,
      applicantPhone,
      coverLetter,
      experience,
      education,
      skills,
      expectedSalary,
      availability,
    } = req.body;

    console.log("Received application data:", req.body);

    // Validate required fields
    if (!jobId || !applicantName || !applicantEmail) {
      console.log("Validation failed - missing required fields:", {
        jobId,
        applicantName,
        applicantEmail,
      });
      return res.status(400).json({
        success: false,
        error: "Job ID, applicant name, and email are required",
      });
    }

    // Check if job exists and is active
    const job = await Job.findByPk(jobId);
    console.log("Found job:", job);
    if (!job) {
      console.log("Job not found with ID:", jobId);
      return res.status(404).json({
        success: false,
        error: "Job not found",
      });
    }

    if (job.status !== "active" && job.status !== "Published") {
      console.log("Job status validation failed. Current status:", job.status);
      return res.status(400).json({
        success: false,
        error: "This job is no longer accepting applications",
      });
    }

    // Check if user has already applied for this job (within last 24 hours to prevent spam)
    const existingApplication = await Application.findOne({
      where: {
        jobId,
        applicantEmail,
        applicationDate: {
          [require("sequelize").Op.gte]: new Date(
            Date.now() - 24 * 60 * 60 * 1000
          ), // Last 24 hours
        },
      },
    });

    if (existingApplication) {
      return res.status(400).json({
        success: false,
        error: "You have already applied for this job within the last 24 hours",
      });
    }

    // Create application
    const application = await Application.create({
      jobId,
      applicantName,
      applicantEmail,
      applicantPhone,
      coverLetter,
      experience,
      education,
      skills,
      expectedSalary,
      availability,
    });

    // Return the created application with job details
    const createdApplication = await Application.findByPk(application.id, {
      include: [
        {
          model: Job,
          as: "job",
          attributes: ["id", "title", "company", "location"],
        },
      ],
    });

    res.status(201).json({
      success: true,
      message: "Application submitted successfully",
      data: createdApplication,
    });
  } catch (error) {
    console.error("Error creating application:", error);
    res.status(500).json({
      success: false,
      error: "Failed to submit application",
    });
  }
};

// Update application status (for employers/admins)
const updateApplicationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, notes } = req.body;

    if (!status) {
      return res.status(400).json({
        success: false,
        error: "Status is required",
      });
    }

    const application = await Application.findByPk(id);
    if (!application) {
      return res.status(404).json({
        success: false,
        error: "Application not found",
      });
    }

    // Update application
    await application.update({
      status,
      notes: notes || application.notes,
      lastUpdated: new Date(),
    });

    // Return updated application with job details
    const updatedApplication = await Application.findByPk(id, {
      include: [
        {
          model: Job,
          as: "job",
          attributes: ["id", "title", "company", "location"],
        },
      ],
    });

    res.json({
      success: true,
      message: "Application status updated successfully",
      data: updatedApplication,
    });
  } catch (error) {
    console.error("Error updating application:", error);
    res.status(500).json({
      success: false,
      error: "Failed to update application",
    });
  }
};

// Delete application (for employers/admins)
const deleteApplication = async (req, res) => {
  try {
    const { id } = req.params;

    const application = await Application.findByPk(id);
    if (!application) {
      return res.status(404).json({
        success: false,
        error: "Application not found",
      });
    }

    await application.destroy();

    res.json({
      success: true,
      message: "Application deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting application:", error);
    res.status(500).json({
      success: false,
      error: "Failed to delete application",
    });
  }
};

// Get applications by email (for applicants to check their applications)
const getApplicationsByEmail = async (req, res) => {
  try {
    const { email } = req.params;

    if (!email) {
      return res.status(400).json({
        success: false,
        error: "Email is required",
      });
    }

    const applications = await Application.findAll({
      where: { applicantEmail: email },
      include: [
        {
          model: Job,
          as: "job",
          attributes: ["id", "title", "company", "location", "status"],
        },
      ],
      order: [["applicationDate", "DESC"]],
    });

    res.json({
      success: true,
      data: applications,
    });
  } catch (error) {
    console.error("Error fetching applications by email:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch applications",
    });
  }
};

module.exports = {
  getApplications,
  getApplication,
  createApplication,
  updateApplicationStatus,
  deleteApplication,
  getApplicationsByEmail,
};

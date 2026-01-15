require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { sequelize, createDatabaseIfNotExists } = require("./config/database");
const jobRoutes = require("./routes/jobRoutes");
const applicationRoutes = require("./routes/applicationRoutes");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const auditRoutes = require("./routes/auditRoutes");
const Job = require("./models/Job");
const Application = require("./models/Application");
const User = require("./models/User");
const Audit = require("./models/Audit");

const app = express();

// Middleware
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Setup model associations
const setupAssociations = () => {
  User.associate({ Application, Audit });
  Application.associate({ User, Job });
  Job.associate({ Application });
  Audit.associate({ User });
};

// Initialize database and tables
const initializeDatabase = async () => {
  try {
    // Create database if it doesn't exist
    await createDatabaseIfNotExists();

    // Connect to the database
    await sequelize.authenticate();
    console.log("Database connection has been established successfully.");

    // Setup model associations
    setupAssociations();

    // Sync all models (create tables)
    const syncOptions = {};
    if (process.env.DB_SYNC_FORCE === "true") {
      syncOptions.force = true;
    } else if (process.env.DB_SYNC_ALTER === "true") {
      syncOptions.alter = true;
    }

    await sequelize.sync(syncOptions);
    console.log("All tables were synchronized successfully.");
  } catch (error) {
    console.error("Unable to initialize database:", error);
  }
};

const startServer = async () => {
  await initializeDatabase();

  // API Routes
  app.use("/api/auth", authRoutes);
  app.use("/api/jobs", jobRoutes);
  app.use("/api/applications", applicationRoutes);
  app.use("/api/users", userRoutes);
  app.use("/api/audit", auditRoutes);

  // Base route
  app.get("/", (req, res) => {
    res.json({
      message: "Welcome to Job Portal API",
      endpoints: {
        auth: {
          register: "POST /api/auth/register",
          login: "POST /api/auth/login",
          getCurrentUser: "GET /api/auth/me (auth required)",
        },
        jobs: {
          getAll: "GET /api/jobs",
          getOne: "GET /api/jobs/:id",
          create: "POST /api/jobs",
          update: "PUT /api/jobs/:id",
          delete: "DELETE /api/jobs/:id",
        },
        applications: {
          submit: "POST /api/applications",
          getByEmail: "GET /api/applications/email/:email",
          getAll: "GET /api/applications (auth required)",
          getOne: "GET /api/applications/:id (auth required)",
          updateStatus: "PUT /api/applications/:id/status (auth required)",
          delete: "DELETE /api/applications/:id (auth required)",
        },
        users: {
          getAll: "GET /api/users (admin required)",
          getOne: "GET /api/users/:id (admin required)",
          update: "PUT /api/users/:id (admin required)",
          delete: "DELETE /api/users/:id (admin required)",
          updateRole: "PUT /api/users/:id/role (admin required)",
          updateStatus: "PUT /api/users/:id/status (admin required)",
          getStatistics: "GET /api/users/statistics (admin required)",
          getActivity: "GET /api/users/:id/activity (admin required)",
        },
      },
    });
  });

  // 404 handler
  app.use((req, res) => {
    res.status(404).json({ success: false, error: "Route not found" });
  });

  // Error handling middleware
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
      success: false,
      error:
        process.env.NODE_ENV === "development"
          ? err.message
          : "Internal server error",
    });
  });

  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`API Documentation: http://localhost:${PORT}`);
  });
};

startServer();

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./config/database");
const jobRoutes = require("./routes/jobRoutes");
const Job = require("./models/Job");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test database connection
const testConnection = async () => {
  try {
    await db.authenticate();
    console.log("Database connection has been established successfully.");

    // Sync all models
    await db.sync({ force: false }); // Set force: true to drop and recreate tables
    console.log("All models were synchronized successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

testConnection();

// API Routes
app.use("/api/jobs", jobRoutes);

// Base route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to Job Portal API",
    endpoints: {
      jobs: {
        getAll: "GET /api/jobs",
        getOne: "GET /api/jobs/:id",
        create: "POST /api/jobs",
        update: "PUT /api/jobs/:id",
        delete: "DELETE /api/jobs/:id",
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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`API Documentation: http://localhost:${PORT}`);
});

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Application = require("../models/Application");
const Job = require("../models/Job");

// Register user
const register = async (req, res) => {
  try {
    const { name, email, password, role = "jobseeker" } = req.body;
    const normalizedEmail =
      typeof email === "string" ? email.trim().toLowerCase() : email;

    // Validate input
    if (!name || !normalizedEmail || !password) {
      return res.status(400).json({
        success: false,
        error: "Name, email, and password are required",
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({
      where: { email: normalizedEmail },
    });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: "User with this email already exists",
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
      name,
      email: normalizedEmail,
      password: hashedPassword,
      role,
    });

    // Create sample applications for new job seekers
    if (role === "jobseeker") {
      try {
        const jobs = await Job.findAll({ limit: 3 });

        if (jobs.length > 0) {
          const sampleApplications = [
            {
              jobId: jobs[0].id,
              applicantName: name,
              applicantEmail: normalizedEmail,
              applicantPhone: "+1234567890",
              coverLetter:
                "I am very interested in this position and believe my skills match perfectly.",
              experience: "3 years of experience in the field",
              education: "Bachelor degree in relevant field",
              skills: "JavaScript, React, Node.js, Communication",
              expectedSalary: "$70,000 - $90,000",
              availability: "2 weeks",
              status: "pending",
            },
            {
              jobId: jobs[1]?.id || jobs[0].id,
              applicantName: name,
              applicantEmail: normalizedEmail,
              applicantPhone: "+1234567890",
              coverLetter:
                "Experienced professional looking for new challenges.",
              experience: "5 years of professional experience",
              education: "Master degree in Computer Science",
              skills: "Python, Django, PostgreSQL, Leadership",
              expectedSalary: "$80,000 - $100,000",
              availability: "1 month notice",
              status: "interview_scheduled",
            },
            {
              jobId: jobs[2]?.id || jobs[0].id,
              applicantName: name,
              applicantEmail: normalizedEmail,
              applicantPhone: "+1234567890",
              coverLetter: "Senior candidate with strong technical background.",
              experience: "7 years of experience in software development",
              education: "PhD in Computer Science",
              skills: "System Architecture, Cloud, DevOps, Management",
              expectedSalary: "$120,000 - $140,000",
              availability: "2 weeks",
              status: "offered",
            },
          ];

          for (const appData of sampleApplications) {
            await Application.create(appData);
          }

          console.log(
            `Created sample applications for new job seeker: ${name}`
          );
        }
      } catch (appError) {
        console.error("Error creating sample applications:", appError);
        // Don't fail registration if sample applications fail
      }
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || "job-portal-secret-key-2024-hp",
      { expiresIn: process.env.JWT_EXPIRE || "30d" }
    );

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        token,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({
      success: false,
      error: "Server error during registration",
    });
  }
};

// Login user
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const normalizedEmail =
      typeof email === "string" ? email.trim().toLowerCase() : email;

    // Validate input
    if (!normalizedEmail || !password) {
      return res.status(400).json({
        success: false,
        error: "Email and password are required",
      });
    }

    // Find user
    const user = await User.findOne({ where: { email: normalizedEmail } });
    if (!user) {
      return res.status(401).json({
        success: false,
        error: "Invalid credentials",
      });
    }

    // Check password
    let isMatch = false;
    try {
      isMatch = await bcrypt.compare(password, user.password);
    } catch (compareError) {
      isMatch = false;
    }

    // Support legacy/plaintext passwords stored in DB (upgrade on successful login)
    if (
      !isMatch &&
      typeof user.password === "string" &&
      user.password === password
    ) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      await user.update({ password: hashedPassword });
      isMatch = true;
    }

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        error: "Invalid credentials",
      });
    }

    // Update last login
    await user.update({ lastLogin: new Date() });

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || "job-portal-secret-key-2024-hp",
      { expiresIn: process.env.JWT_EXPIRE || "30d" }
    );

    res.json({
      success: true,
      message: "Login successful",
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        token,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      error: "Server error during login",
    });
  }
};

// Get current user (protected route)
const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ["password"] },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        error: "User not found",
      });
    }

    res.json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error("Get current user error:", error);
    res.status(500).json({
      success: false,
      error: "Server error",
    });
  }
};

module.exports = {
  register,
  login,
  getCurrentUser,
};

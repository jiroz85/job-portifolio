const User = require("../models/User");
const Application = require("../models/Application");
const Job = require("../models/Job");
const Audit = require("../models/Audit");
const { Op } = require("sequelize");

// Get all users with pagination and filtering
const getAllUsers = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      search = "",
      role = "",
      status = "",
      sortBy = "createdAt",
      sortOrder = "DESC",
    } = req.query;

    const offset = (page - 1) * limit;
    const whereClause = {};

    // Build search conditions
    if (search) {
      whereClause[Op.or] = [
        { name: { [Op.like]: `%${search}%` } },
        { email: { [Op.like]: `%${search}%` } },
        { location: { [Op.like]: `%${search}%` } },
      ];
    }

    if (role) {
      whereClause.role = role;
    }

    if (status) {
      whereClause.status = status;
    }

    const { count, rows: users } = await User.findAndCountAll({
      where: whereClause,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [[sortBy, sortOrder.toUpperCase()]],
      attributes: { exclude: ["password"] },
    });

    res.json({
      success: true,
      data: {
        users,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(count / limit),
          totalUsers: count,
          hasNext: page * limit < count,
          hasPrev: page > 1,
        },
      },
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch users",
    });
  }
};

// Get user by ID with detailed information
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id, {
      attributes: { exclude: ["password"] },
      include: [
        {
          model: Application,
          as: "applications",
          include: [
            {
              model: Job,
              as: "job",
              attributes: ["id", "title", "company", "location", "type"],
            },
          ],
        },
      ],
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        error: "User not found",
      });
    }

    // Parse JSON fields
    const userData = user.toJSON();
    if (userData.skills) {
      userData.skills = JSON.parse(userData.skills);
    }
    if (userData.experience) {
      userData.experience = JSON.parse(userData.experience);
    }
    if (userData.education) {
      userData.education = JSON.parse(userData.education);
    }
    if (userData.employerDetails) {
      userData.employerDetails = JSON.parse(userData.employerDetails);
    }

    res.json({
      success: true,
      data: userData,
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch user",
    });
  }
};

// Update user
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Remove sensitive fields that shouldn't be updated directly
    delete updates.password;
    delete updates.emailVerificationToken;
    delete updates.passwordResetToken;
    delete updates.passwordResetExpires;

    // Parse JSON fields if they're strings
    if (updates.skills && typeof updates.skills === "string") {
      updates.skills = JSON.stringify(updates.skills);
    }
    if (updates.experience && typeof updates.experience === "string") {
      updates.experience = JSON.stringify(updates.experience);
    }
    if (updates.education && typeof updates.education === "string") {
      updates.education = JSON.stringify(updates.education);
    }
    if (
      updates.employerDetails &&
      typeof updates.employerDetails === "string"
    ) {
      updates.employerDetails = JSON.stringify(updates.employerDetails);
    }

    const [updatedRowsCount] = await User.update(updates, {
      where: { id },
    });

    if (updatedRowsCount === 0) {
      return res.status(404).json({
        success: false,
        error: "User not found",
      });
    }

    const updatedUser = await User.findByPk(id, {
      attributes: { exclude: ["password"] },
    });

    res.json({
      success: true,
      data: updatedUser,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({
      success: false,
      error: "Failed to update user",
    });
  }
};

// Delete user
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Get the user before deletion for audit
    const userBefore = await User.findByPk(id);
    if (!userBefore) {
      return res.status(404).json({
        success: false,
        error: "User not found",
      });
    }

    const deletedRowsCount = await User.destroy({
      where: { id },
    });

    if (deletedRowsCount === 0) {
      return res.status(404).json({
        success: false,
        error: "User not found",
      });
    }

    // Log the action for audit trail
    await Audit.create({
      action: "USER_DELETE",
      targetUserId: parseInt(id),
      performedBy: req.user.id,
      details: `Deleted user: ${userBefore.name} (${userBefore.email})`,
      ipAddress: req.ip || req.connection.remoteAddress,
      userAgent: req.get("User-Agent"),
    });

    res.json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({
      success: false,
      error: "Failed to delete user",
    });
  }
};

// Update user role
const updateUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    if (!["user", "admin", "employer"].includes(role)) {
      return res.status(400).json({
        success: false,
        error: "Invalid role",
      });
    }

    // Get the user before update for audit
    const userBefore = await User.findByPk(id);
    if (!userBefore) {
      return res.status(404).json({
        success: false,
        error: "User not found",
      });
    }

    const [updatedRowsCount] = await User.update({ role }, { where: { id } });

    if (updatedRowsCount === 0) {
      return res.status(404).json({
        success: false,
        error: "User not found",
      });
    }

    // Log the action for audit trail
    await Audit.create({
      action: "ROLE_CHANGE",
      targetUserId: parseInt(id),
      performedBy: req.user.id,
      details: `Changed role from ${userBefore.role} to ${role}`,
      ipAddress: req.ip || req.connection.remoteAddress,
      userAgent: req.get("User-Agent"),
    });

    res.json({
      success: true,
      message: "User role updated successfully",
    });
  } catch (error) {
    console.error("Error updating user role:", error);
    res.status(500).json({
      success: false,
      error: "Failed to update user role",
    });
  }
};

// Update user status
const updateUserStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["active", "inactive", "blocked"].includes(status)) {
      return res.status(400).json({
        success: false,
        error: "Invalid status",
      });
    }

    // Get the user before update for audit
    const userBefore = await User.findByPk(id);
    if (!userBefore) {
      return res.status(404).json({
        success: false,
        error: "User not found",
      });
    }

    const [updatedRowsCount] = await User.update({ status }, { where: { id } });

    if (updatedRowsCount === 0) {
      return res.status(404).json({
        success: false,
        error: "User not found",
      });
    }

    // Log the action for audit trail
    await Audit.create({
      action: "STATUS_CHANGE",
      targetUserId: parseInt(id),
      performedBy: req.user.id,
      details: `Changed status from ${userBefore.status} to ${status}`,
      ipAddress: req.ip || req.connection.remoteAddress,
      userAgent: req.get("User-Agent"),
    });

    res.json({
      success: true,
      message: "User status updated successfully",
    });
  } catch (error) {
    console.error("Error updating user status:", error);
    res.status(500).json({
      success: false,
      error: "Failed to update user status",
    });
  }
};

// Get user statistics
const getUserStatistics = async (req, res) => {
  try {
    const totalUsers = await User.count();
    const activeUsers = await User.count({ where: { status: "active" } });
    const inactiveUsers = await User.count({ where: { status: "inactive" } });
    const blockedUsers = await User.count({ where: { status: "blocked" } });

    const roleStats = await User.findAll({
      attributes: [
        "role",
        [User.sequelize.fn("COUNT", User.sequelize.col("id")), "count"],
      ],
      group: ["role"],
    });

    const recentUsers = await User.findAll({
      limit: 5,
      order: [["createdAt", "DESC"]],
      attributes: ["id", "name", "email", "role", "createdAt"],
    });

    // User registration trends (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const registrationTrend = await User.findAll({
      where: {
        createdAt: {
          [Op.gte]: thirtyDaysAgo,
        },
      },
      attributes: [
        [User.sequelize.fn("DATE", User.sequelize.col("createdAt")), "date"],
        [User.sequelize.fn("COUNT", User.sequelize.col("id")), "count"],
      ],
      group: [User.sequelize.fn("DATE", User.sequelize.col("createdAt"))],
      order: [
        [User.sequelize.fn("DATE", User.sequelize.col("createdAt")), "ASC"],
      ],
    });

    res.json({
      success: true,
      data: {
        totalUsers,
        activeUsers,
        inactiveUsers,
        blockedUsers,
        roleStats: roleStats.map((stat) => ({
          role: stat.role,
          count: parseInt(stat.dataValues.count),
        })),
        recentUsers,
        registrationTrend: registrationTrend.map((trend) => ({
          date: trend.dataValues.date,
          count: parseInt(trend.dataValues.count),
        })),
      },
    });
  } catch (error) {
    console.error("Error fetching user statistics:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch user statistics",
    });
  }
};

// Get user activity
const getUserActivity = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id, {
      attributes: ["id", "name", "email", "lastLogin", "createdAt"],
      include: [
        {
          model: Application,
          as: "applications",
          include: [
            {
              model: Job,
              as: "job",
              attributes: ["id", "title", "company"],
            },
          ],
          order: [["createdAt", "DESC"]],
        },
      ],
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        error: "User not found",
      });
    }

    const userData = user.toJSON();

    // Calculate activity metrics
    const totalApplications = userData.applications.length;
    const recentApplications = userData.applications.filter(
      (app) =>
        new Date(app.createdAt) >
        new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    ).length;

    // Application status breakdown
    const statusBreakdown = userData.applications.reduce((acc, app) => {
      acc[app.status] = (acc[app.status] || 0) + 1;
      return acc;
    }, {});

    res.json({
      success: true,
      data: {
        user: {
          id: userData.id,
          name: userData.name,
          email: userData.email,
          lastLogin: userData.lastLogin,
          memberSince: userData.createdAt,
        },
        activity: {
          totalApplications,
          recentApplications,
          statusBreakdown,
          applications: userData.applications,
        },
      },
    });
  } catch (error) {
    console.error("Error fetching user activity:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch user activity",
    });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  updateUserRole,
  updateUserStatus,
  getUserStatistics,
  getUserActivity,
};

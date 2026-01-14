const Audit = require("../models/Audit");
const User = require("../models/User");
const { Op } = require("sequelize");

// Log admin action for audit trail
const logAction = async (req, res) => {
  try {
    const { action, targetUserId, details } = req.body;
    const performedBy = req.user.id;
    const ipAddress = req.ip || req.connection.remoteAddress;
    const userAgent = req.get("User-Agent");

    if (!action) {
      return res.status(400).json({
        success: false,
        error: "Action is required",
      });
    }

    const auditLog = await Audit.create({
      action,
      targetUserId,
      performedBy,
      details,
      ipAddress,
      userAgent,
    });

    res.status(201).json({
      success: true,
      data: auditLog,
    });
  } catch (error) {
    console.error("Error logging audit action:", error);
    res.status(500).json({
      success: false,
      error: "Failed to log audit action",
    });
  }
};

// Get audit logs for admin dashboard
const getAuditLogs = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      action = "",
      userId = "",
      startDate = "",
      endDate = "",
      sortBy = "createdAt",
      sortOrder = "DESC",
    } = req.query;

    const offset = (page - 1) * limit;
    const whereClause = {};

    // Build search conditions
    if (action) {
      whereClause.action = action;
    }

    if (userId) {
      whereClause[Op.or] = [{ targetUserId: userId }, { performedBy: userId }];
    }

    if (startDate || endDate) {
      whereClause.createdAt = {};
      if (startDate) {
        whereClause.createdAt[Op.gte] = new Date(startDate);
      }
      if (endDate) {
        whereClause.createdAt[Op.lte] = new Date(endDate);
      }
    }

    const { count, rows: logs } = await Audit.findAndCountAll({
      where: whereClause,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [[sortBy, sortOrder.toUpperCase()]],
      include: [
        {
          model: User,
          as: "performedByUser",
          attributes: ["id", "name", "email", "role"],
          foreignKey: "performedBy",
        },
        {
          model: User,
          as: "targetUser",
          attributes: ["id", "name", "email", "role"],
          foreignKey: "targetUserId",
        },
      ],
    });

    res.json({
      success: true,
      data: {
        logs,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(count / limit),
          totalLogs: count,
          hasNext: page * limit < count,
          hasPrev: page > 1,
        },
      },
    });
  } catch (error) {
    console.error("Error fetching audit logs:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch audit logs",
    });
  }
};

// Get user activity history
const getUserActivity = async (req, res) => {
  try {
    const { userId } = req.params;
    const {
      page = 1,
      limit = 20,
      startDate = "",
      endDate = "",
      sortBy = "createdAt",
      sortOrder = "DESC",
    } = req.query;

    const offset = (page - 1) * limit;
    const whereClause = {
      [Op.or]: [{ targetUserId: userId }, { performedBy: userId }],
    };

    if (startDate || endDate) {
      whereClause.createdAt = {};
      if (startDate) {
        whereClause.createdAt[Op.gte] = new Date(startDate);
      }
      if (endDate) {
        whereClause.createdAt[Op.lte] = new Date(endDate);
      }
    }

    const { count, rows: activities } = await Audit.findAndCountAll({
      where: whereClause,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [[sortBy, sortOrder.toUpperCase()]],
      include: [
        {
          model: User,
          as: "performedByUser",
          attributes: ["id", "name", "email", "role"],
          foreignKey: "performedBy",
        },
        {
          model: User,
          as: "targetUser",
          attributes: ["id", "name", "email", "role"],
          foreignKey: "targetUserId",
        },
      ],
    });

    res.json({
      success: true,
      data: {
        activities,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(count / limit),
          totalActivities: count,
          hasNext: page * limit < count,
          hasPrev: page > 1,
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

// Get system statistics
const getSystemStats = async (req, res) => {
  try {
    // Get action breakdown
    const actionStats = await Audit.findAll({
      attributes: [
        "action",
        [Audit.sequelize.fn("COUNT", Audit.sequelize.col("id")), "count"],
      ],
      group: ["action"],
    });

    // Get recent activities (last 24 hours)
    const twentyFourHoursAgo = new Date();
    twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 24);

    const recentActivity = await Audit.findAll({
      where: {
        createdAt: {
          [Op.gte]: twentyFourHoursAgo,
        },
      },
      include: [
        {
          model: User,
          as: "performedByUser",
          attributes: ["id", "name", "email", "role"],
          foreignKey: "performedBy",
        },
      ],
      order: [["createdAt", "DESC"]],
      limit: 10,
    });

    // Get activity trends (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const activityTrend = await Audit.findAll({
      where: {
        createdAt: {
          [Op.gte]: sevenDaysAgo,
        },
      },
      attributes: [
        [Audit.sequelize.fn("DATE", Audit.sequelize.col("createdAt")), "date"],
        [Audit.sequelize.fn("COUNT", Audit.sequelize.col("id")), "count"],
      ],
      group: [Audit.sequelize.fn("DATE", Audit.sequelize.col("createdAt"))],
      order: [
        [Audit.sequelize.fn("DATE", Audit.sequelize.col("createdAt")), "ASC"],
      ],
    });

    res.json({
      success: true,
      data: {
        actionStats: actionStats.map((stat) => ({
          action: stat.action,
          count: parseInt(stat.dataValues.count),
        })),
        recentActivity,
        activityTrend: activityTrend.map((trend) => ({
          date: trend.dataValues.date,
          count: parseInt(trend.dataValues.count),
        })),
      },
    });
  } catch (error) {
    console.error("Error fetching system stats:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch system stats",
    });
  }
};

// Export audit logs
const exportLogs = async (req, res) => {
  try {
    const { action, userId, startDate, endDate, format = "csv" } = req.query;

    const whereClause = {};

    if (action) {
      whereClause.action = action;
    }

    if (userId) {
      whereClause[Op.or] = [{ targetUserId: userId }, { performedBy: userId }];
    }

    if (startDate || endDate) {
      whereClause.createdAt = {};
      if (startDate) {
        whereClause.createdAt[Op.gte] = new Date(startDate);
      }
      if (endDate) {
        whereClause.createdAt[Op.lte] = new Date(endDate);
      }
    }

    const logs = await Audit.findAll({
      where: whereClause,
      include: [
        {
          model: User,
          as: "performedByUser",
          attributes: ["id", "name", "email", "role"],
          foreignKey: "performedBy",
        },
        {
          model: User,
          as: "targetUser",
          attributes: ["id", "name", "email", "role"],
          foreignKey: "targetUserId",
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    if (format === "csv") {
      // Convert to CSV
      const csvHeaders = [
        "ID",
        "Action",
        "Target User",
        "Performed By",
        "Details",
        "IP Address",
        "Created At",
      ];

      const csvRows = logs.map((log) => [
        log.id,
        log.action,
        log.targetUser
          ? `${log.targetUser.name} (${log.targetUser.email})`
          : "N/A",
        log.performedByUser
          ? `${log.performedByUser.name} (${log.performedByUser.email})`
          : "N/A",
        log.details || "",
        log.ipAddress || "",
        log.createdAt.toISOString(),
      ]);

      const csvContent = [csvHeaders, ...csvRows]
        .map((row) => row.map((field) => `"${field}"`).join(","))
        .join("\n");

      res.setHeader("Content-Type", "text/csv");
      res.setHeader(
        "Content-Disposition",
        `attachment; filename="audit-logs-${
          new Date().toISOString().split("T")[0]
        }.csv"`
      );
      res.send(csvContent);
    } else {
      res.json({
        success: true,
        data: logs,
      });
    }
  } catch (error) {
    console.error("Error exporting audit logs:", error);
    res.status(500).json({
      success: false,
      error: "Failed to export audit logs",
    });
  }
};

module.exports = {
  logAction,
  getAuditLogs,
  getUserActivity,
  getSystemStats,
  exportLogs,
};

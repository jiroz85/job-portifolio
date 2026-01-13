const { Op } = require("sequelize");
const Job = require("../models/Job");

// @desc    Get all jobs
// @route   GET /api/jobs
// @access  Public
exports.getJobs = async (req, res) => {
  try {
    const {
      search,
      location,
      type,
      experience,
      page = 1,
      limit = 10,
    } = req.query;
    const offset = (page - 1) * limit;

    const whereClause = {
      [Op.or]: [{ status: "Published" }, { status: "active" }],
    };

    if (search) {
      whereClause[Op.and] = [
        {
          [Op.or]: [{ status: "Published" }, { status: "active" }],
        },
        {
          [Op.or]: [
            { title: { [Op.like]: `%${search}%` } },
            { company: { [Op.like]: `%${search}%` } },
            { description: { [Op.like]: `%${search}%` } },
          ],
        },
      ];
    } else {
      whereClause[Op.or] = [{ status: "Published" }, { status: "active" }];
    }

    if (location) {
      if (whereClause[Op.and]) {
        whereClause[Op.and].push({ location: { [Op.like]: `%${location}%` } });
      } else {
        whereClause[Op.and] = [
          {
            [Op.or]: [{ status: "Published" }, { status: "active" }],
          },
          { location: { [Op.like]: `%${location}%` } },
        ];
      }
    }

    if (type) {
      if (whereClause[Op.and]) {
        whereClause[Op.and].push({ type: type });
      } else {
        whereClause[Op.and] = [
          {
            [Op.or]: [{ status: "Published" }, { status: "active" }],
          },
          { type: type },
        ];
      }
    }

    if (experience) {
      if (whereClause[Op.and]) {
        whereClause[Op.and].push({ experience: experience });
      } else {
        whereClause[Op.and] = [
          {
            [Op.or]: [{ status: "Published" }, { status: "active" }],
          },
          { experience: experience },
        ];
      }
    }

    const { count, rows: jobs } = await Job.findAndCountAll({
      where: whereClause,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [["createdAt", "DESC"]],
    });

    const totalPages = Math.ceil(count / limit);

    res.json({
      success: true,
      count: jobs.length,
      total: count,
      totalPages,
      currentPage: parseInt(page),
      data: jobs,
    });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

// @desc    Get single job
// @route   GET /api/jobs/:id
// @access  Public
exports.getJob = async (req, res) => {
  try {
    const job = await Job.findByPk(req.params.id);

    if (!job) {
      return res.status(404).json({ success: false, error: "Job not found" });
    }

    res.json({ success: true, data: job });
  } catch (error) {
    console.error("Error fetching job:", error);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

// @desc    Create job
// @route   POST /api/jobs
// @access  Private/Admin
exports.createJob = async (req, res) => {
  try {
    const job = await Job.create(req.body);
    res.status(201).json({ success: true, data: job });
  } catch (error) {
    console.error("Error creating job:", error);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

// @desc    Update job
// @route   PUT /api/jobs/:id
// @access  Private/Admin
exports.updateJob = async (req, res) => {
  try {
    const job = await Job.findByPk(req.params.id);

    if (!job) {
      return res.status(404).json({ success: false, error: "Job not found" });
    }

    await job.update(req.body);
    res.json({ success: true, data: job });
  } catch (error) {
    console.error("Error updating job:", error);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

// @desc    Delete job
// @route   DELETE /api/jobs/:id
// @access  Private/Admin
exports.deleteJob = async (req, res) => {
  try {
    const job = await Job.findByPk(req.params.id);

    if (!job) {
      return res.status(404).json({ success: false, error: "Job not found" });
    }

    await job.destroy();
    res.json({ success: true, data: {} });
  } catch (error) {
    console.error("Error deleting job:", error);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

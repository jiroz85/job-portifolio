const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Job = sequelize.define(
  "Job",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    company: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    requirements: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    salary: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    type: {
      type: DataTypes.ENUM(
        "Full-time",
        "Part-time",
        "Contract",
        "Internship",
        "Temporary"
      ),
      allowNull: false,
    },
    experience: {
      type: DataTypes.ENUM(
        "Entry Level",
        "Mid Level",
        "Senior Level",
        "Lead",
        "Manager"
      ),
      allowNull: false,
    },
    skills: {
      type: DataTypes.STRING, // Will store as comma-separated values
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("active", "inactive", "filled"),
      defaultValue: "active",
    },
  },
  {
    timestamps: true,
    tableName: "jobs",
  }
);

module.exports = Job;

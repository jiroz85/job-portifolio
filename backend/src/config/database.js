const { Sequelize } = require("sequelize");

// Create database connection without specifying database first
const sequelize = new Sequelize(
  process.env.DB_NAME || "job_portal",
  process.env.DB_USER || "root",
  process.env.DB_PASSWORD || "",
  {
    host: process.env.DB_HOST || "localhost",
    dialect: "mysql",
    logging: false, // Set to console.log to see SQL queries
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

// Function to create database if it doesn't exist
const createDatabaseIfNotExists = async () => {
  try {
    // Connect without specifying database to create it
    const connection = new Sequelize(
      null,
      process.env.DB_USER || "root",
      process.env.DB_PASSWORD || "",
      {
        host: process.env.DB_HOST || "localhost",
        dialect: "mysql",
        logging: false,
      }
    );

    await connection.query(
      `CREATE DATABASE IF NOT EXISTS \`${
        process.env.DB_NAME || "job_portal"
      }\`;`
    );
    await connection.close();
    console.log("Database created or already exists");
  } catch (error) {
    console.error("Error creating database:", error);
  }
};

module.exports = { sequelize, createDatabaseIfNotExists };

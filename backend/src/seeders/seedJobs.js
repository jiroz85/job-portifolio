require("dotenv").config();
const db = require("../config/database");
const Job = require("../models/Job");

const sampleJobs = [
  {
    title: "Frontend Developer",
    company: "Tech Corp",
    location: "New York, NY",
    description:
      "We are looking for a skilled Frontend Developer to join our team.",
    requirements: "3+ years of experience with React, JavaScript, and CSS",
    salary: "$90,000 - $120,000",
    type: "Full-time",
    experience: "Mid Level",
    skills: "React,JavaScript,CSS,HTML",
    status: "active",
  },
  {
    title: "Backend Developer",
    company: "Data Systems Inc",
    location: "Remote",
    description:
      "Looking for a Backend Developer to build robust APIs and services.",
    requirements: "Experience with Node.js, Express, and databases",
    salary: "$100,000 - $140,000",
    type: "Full-time",
    experience: "Senior Level",
    skills: "Node.js,Express,SQL,API Development",
    status: "active",
  },
  {
    title: "UI/UX Designer",
    company: "Creative Minds",
    location: "San Francisco, CA",
    description: "Join our design team to create beautiful user experiences.",
    requirements: "Portfolio demonstrating UI/UX skills, 2+ years experience",
    salary: "$80,000 - $110,000",
    type: "Full-time",
    experience: "Mid Level",
    skills: "Figma,Sketch,UI/UX,Prototyping",
    status: "active",
  },
];

const seedDatabase = async () => {
  try {
    // Sync all models
    await db.sync({ force: true }); // This will drop and recreate tables

    // Create sample jobs
    await Job.bulkCreate(sampleJobs);

    console.log("Database seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();

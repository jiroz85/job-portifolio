import React, { createContext, useContext, useState, useEffect } from "react";

const JobContext = createContext();

export const useJobs = () => {
  const context = useContext(JobContext);
  if (!context) {
    throw new Error("useJobs must be used within a JobProvider");
  }
  return context;
};

export const JobProvider = ({ children }) => {
  const [jobs, setJobs] = useState(() => {
    // Initialize with existing jobs from localStorage or default mock data
    const savedJobs = localStorage.getItem("jobs");
    if (savedJobs) {
      const parsedJobs = JSON.parse(savedJobs);
      // Update all existing jobs to have Published and approved status
      return parsedJobs.map((job) => ({
        ...job,
        status: "Published",
        approvalStatus: "approved",
      }));
    }

    // Default mock data matching the existing JobsManagement data
    return [
      {
        id: 1,
        title: "Senior React Developer",
        company: "Tech Corp",
        location: "San Francisco, CA",
        type: "Full-time",
        status: "Published",
        description: "We are looking for an experienced React developer...",
        requirements: "5+ years of React experience",
        salary: "$120k - $180k",
        createdAt: "2024-01-15",
        approvalStatus: "approved",
        experience: "Senior Level",
        posted: "2 days ago",
      },
      {
        id: 2,
        title: "Frontend Developer",
        company: "StartupXYZ",
        location: "Remote",
        type: "Full-time",
        status: "Published",
        description: "Join our frontend team...",
        requirements: "3+ years of frontend experience",
        salary: "$80k - $120k",
        createdAt: "2024-01-14",
        approvalStatus: "approved",
        experience: "Mid Level",
        posted: "1 week ago",
      },
      {
        id: 3,
        title: "UI/UX Designer",
        company: "Design Studio",
        location: "New York, NY",
        type: "Contract",
        status: "Published",
        description: "Creative designer needed...",
        requirements: "Portfolio required",
        salary: "$60k - $90k",
        createdAt: "2024-01-13",
        approvalStatus: "approved",
        experience: "Mid Level",
        posted: "3 days ago",
      },
      {
        id: 4,
        title: "Full Stack Developer",
        company: "Tech Solutions Inc",
        location: "Austin, TX",
        type: "Full-time",
        status: "Published",
        description: "Full stack position available...",
        requirements: "Full stack development experience",
        salary: "$100k - $150k",
        createdAt: "2024-01-12",
        approvalStatus: "approved",
        experience: "Senior Level",
        posted: "1 week ago",
      },
    ];
  });

  // Save jobs to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("jobs", JSON.stringify(jobs));
  }, [jobs]);

  // Add a new job
  const addJob = (jobData) => {
    const newJob = {
      id: jobs.length > 0 ? Math.max(...jobs.map((job) => job.id)) + 1 : 1,
      ...jobData,
      createdAt: new Date().toISOString().split("T")[0],
      approvalStatus: "approved",
      posted: "Just posted",
    };
    setJobs([...jobs, newJob]);
    return newJob;
  };

  // Update an existing job
  const updateJob = (jobId, jobData) => {
    setJobs(
      jobs.map((job) => (job.id === jobId ? { ...job, ...jobData } : job))
    );
  };

  // Delete a job
  const deleteJob = (jobId) => {
    setJobs(jobs.filter((job) => job.id !== jobId));
  };

  // Get published jobs (for Browse Jobs page)
  const getPublishedJobs = () => {
    return jobs.filter(
      (job) => job.status === "Published" && job.approvalStatus === "approved"
    );
  };

  // Get all jobs (for admin management)
  const getAllJobs = () => {
    return jobs;
  };

  // Approve a job
  const approveJob = (jobId) => {
    updateJob(jobId, {
      approvalStatus: "approved",
      status: "Published",
    });
  };

  // Reject a job
  const rejectJob = (jobId) => {
    updateJob(jobId, {
      approvalStatus: "rejected",
      status: "Closed",
    });
  };

  const value = {
    jobs,
    addJob,
    updateJob,
    deleteJob,
    getPublishedJobs,
    getAllJobs,
    approveJob,
    rejectJob,
  };

  return <JobContext.Provider value={value}>{children}</JobContext.Provider>;
};

export default JobContext;

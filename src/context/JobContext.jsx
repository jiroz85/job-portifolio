import React, { createContext, useContext, useState, useEffect } from "react";
import { jobService } from "../services/jobService";

const JobContext = createContext();

export const useJobs = () => {
  const context = useContext(JobContext);
  if (!context) {
    throw new Error("useJobs must be used within a JobProvider");
  }
  return context;
};

export const JobProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch jobs from API on component mount
  useEffect(() => {
    fetchJobs();

    // Set up periodic refresh every 30 seconds to sync with database
    const interval = setInterval(fetchJobs, 30000);

    return () => clearInterval(interval);
  }, []);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const response = await jobService.getAllJobs();
      setJobs(response.data || response);
      setError(null);
    } catch (err) {
      console.error("Error fetching jobs:", err);
      setError("Failed to fetch jobs");
      // Don't use fallback data - only show real database data
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  // Add a new job
  const addJob = async (jobData) => {
    try {
      const response = await jobService.createJob(jobData);
      const newJob = response.data || response;
      // Refresh the entire jobs list from database
      await fetchJobs();
      return { success: true, data: newJob };
    } catch (err) {
      console.error("Error adding job:", err);
      const errorMessage =
        err.response?.data?.message || err.message || "Failed to add job";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  // Update an existing job
  const updateJob = async (jobId, jobData) => {
    try {
      const response = await jobService.updateJob(jobId, jobData);
      const updatedJob = response.data || response;
      // Refresh the entire jobs list from database
      await fetchJobs();
      return { success: true, data: updatedJob };
    } catch (err) {
      console.error("Error updating job:", err);
      const errorMessage =
        err.response?.data?.message || err.message || "Failed to update job";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  // Delete a job
  const deleteJob = async (jobId) => {
    try {
      await jobService.deleteJob(jobId);
      // Refresh the entire jobs list from database
      await fetchJobs();
      return { success: true };
    } catch (err) {
      console.error("Error deleting job:", err);
      const errorMessage =
        err.response?.data?.message || err.message || "Failed to delete job";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  // Get published jobs (for Browse Jobs page)
  const getPublishedJobs = () => {
    return jobs.filter(
      (job) =>
        (job.status === "Published" || job.status === "active") &&
        (job.approvalStatus === "approved" || !job.approvalStatus)
    );
  };

  // Get all jobs (for admin management)
  const getAllJobs = () => {
    return jobs;
  };

  // Get all active jobs (for general display across the app)
  const getActiveJobs = () => {
    return jobs.filter(
      (job) =>
        (job.status === "Published" || job.status === "active") &&
        (job.approvalStatus === "approved" || !job.approvalStatus)
    );
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
    loading,
    error,
    addJob,
    updateJob,
    deleteJob,
    getPublishedJobs,
    getAllJobs,
    getActiveJobs,
    approveJob,
    rejectJob,
    fetchJobs,
  };

  return <JobContext.Provider value={value}>{children}</JobContext.Provider>;
};

export default JobContext;

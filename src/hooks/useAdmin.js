import { useState, useEffect } from "react";
import { mockUsers, mockJobs } from "../data/mockData";

// Mock applications data
const mockApplications = [
  {
    _id: "1",
    user: { name: "John Doe", email: "john@example.com" },
    job: { title: "Senior React Developer" },
    status: "pending",
    createdAt: "2024-01-15T10:30:00Z",
    resume: "https://example.com/resume1.pdf",
  },
  {
    _id: "2",
    user: { name: "Jane Smith", email: "jane@example.com" },
    job: { title: "Frontend Developer" },
    status: "reviewed",
    createdAt: "2024-01-16T14:22:00Z",
    resume: "https://example.com/resume2.pdf",
  },
  {
    _id: "3",
    user: { name: "Bob Johnson", email: "bob@example.com" },
    job: { title: "UI/UX Designer" },
    status: "interview",
    createdAt: "2024-01-17T09:15:00Z",
    resume: "https://example.com/resume3.pdf",
  },
];

// Use mock data instead of API calls for testing
const useAdmin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [users, setUsers] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);

  // Fetch all users
  const fetchUsers = async () => {
    try {
      setLoading(true);
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setUsers(mockUsers);
      return mockUsers;
    } catch (err) {
      setError(err.message || "Error fetching users");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Fetch all jobs
  const fetchJobs = async () => {
    try {
      setLoading(true);
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setJobs(mockJobs);
      return mockJobs;
    } catch (err) {
      setError(err.message || "Error fetching jobs");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Update user status
  const updateUserStatus = async (userId, status) => {
    try {
      setLoading(true);
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Update local state
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId ? { ...user, status } : user
        )
      );

      return { success: true };
    } catch (err) {
      setError(err.message || "Error updating user status");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Delete user
  const deleteUser = async (userId) => {
    try {
      setLoading(true);
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Update local state
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));

      return true;
    } catch (err) {
      setError(err.message || "Error deleting user");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Delete job
  const deleteJob = async (jobId) => {
    try {
      setLoading(true);
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Update local state
      setJobs((prevJobs) => prevJobs.filter((job) => job.id !== jobId));

      return true;
    } catch (err) {
      setError(err.message || "Error deleting job");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Create job
  const createJob = async (jobData) => {
    try {
      setLoading(true);
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Create new job with mock ID
      const newJob = {
        id: Date.now().toString(),
        ...jobData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      // Update local state
      setJobs((prevJobs) => [...prevJobs, newJob]);

      return newJob;
    } catch (err) {
      setError(err.message || "Error creating job");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Get job by ID
  const getJobById = async (jobId) => {
    try {
      setLoading(true);
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      const job = jobs.find((j) => j.id === jobId);
      if (!job) {
        throw new Error("Job not found");
      }

      return job;
    } catch (err) {
      setError(err.message || "Error fetching job");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Update job
  const updateJob = async (jobId, jobData) => {
    try {
      setLoading(true);
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Update local state
      setJobs((prevJobs) =>
        prevJobs.map((job) =>
          job.id === jobId
            ? { ...job, ...jobData, updatedAt: new Date().toISOString() }
            : job
        )
      );

      return { success: true };
    } catch (err) {
      setError(err.message || "Error updating job");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Approve/Reject job (update job status)
  const updateJobStatus = async (jobId, status) => {
    try {
      setLoading(true);
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Update local state
      setJobs((prevJobs) =>
        prevJobs.map((job) =>
          job.id === jobId
            ? { ...job, status, updatedAt: new Date().toISOString() }
            : job
        )
      );

      return { success: true };
    } catch (err) {
      setError(err.message || "Error updating job status");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Initialize data on mount
  useEffect(() => {
    fetchUsers();
    fetchJobs();
    fetchApplications();
  }, []);

  // Fetch all applications
  const fetchApplications = async (filters = {}) => {
    try {
      setLoading(true);
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      let filteredApplications = [...mockApplications];

      // Apply filters if provided
      if (filters.status && filters.status !== "all") {
        filteredApplications = filteredApplications.filter(
          (app) => app.status === filters.status
        );
      }

      setApplications(filteredApplications);
      return filteredApplications;
    } catch (err) {
      setError(err.message || "Error fetching applications");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Update application status
  const updateApplicationStatus = async (applicationId, status) => {
    try {
      setLoading(true);
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Update local state
      setApplications((prevApplications) =>
        prevApplications.map((app) =>
          app._id === applicationId ? { ...app, status } : app
        )
      );

      return { success: true };
    } catch (err) {
      setError(err.message || "Error updating application status");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Delete application
  const deleteApplication = async (applicationId) => {
    try {
      setLoading(true);
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Update local state
      setApplications((prevApplications) =>
        prevApplications.filter((app) => app._id !== applicationId)
      );

      return true;
    } catch (err) {
      setError(err.message || "Error deleting application");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    users,
    jobs,
    applications,
    loading,
    error,
    fetchUsers,
    fetchJobs,
    fetchApplications,
    updateUserStatus,
    deleteUser,
    deleteJob,
    createJob,
    getJobById,
    updateJob,
    updateJobStatus,
    updateApplicationStatus,
    deleteApplication,
  };
};

export default useAdmin;

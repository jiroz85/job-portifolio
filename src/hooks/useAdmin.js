import { useState, useEffect } from "react";
import userApi from "../services/userApi";
import { jobApi } from "../services/jobApi";
import { applicationApi } from "../services/applicationApi";

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
      const response = await userApi.getAllUsers();
      const usersData = response.data?.users || [];
      setUsers(usersData);
      return usersData;
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
      const response = await jobApi.getAllJobs();
      const jobsData = response.data?.jobs || [];
      setJobs(jobsData);
      return jobsData;
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
      await userApi.updateUserStatus(userId, status);

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
      await userApi.deleteUser(userId);

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
      await jobApi.deleteJob(jobId);

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
      const newJob = await jobApi.createJob(jobData);

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
      const job = await jobApi.getJobById(jobId);
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
      await jobApi.updateJob(jobId, jobData);

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
      await jobApi.updateJobStatus(jobId, status);

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
      const response = await applicationApi.getAllApplications(filters);
      const applicationsData = response.data?.applications || [];
      setApplications(applicationsData);
      return applicationsData;
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
      await applicationApi.updateApplicationStatus(applicationId, status);

      // Update local state
      setApplications((prevApplications) =>
        prevApplications.map((app) =>
          app.id === applicationId ? { ...app, status } : app
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
      await applicationApi.deleteApplication(applicationId);

      // Update local state
      setApplications((prevApplications) =>
        prevApplications.filter((app) => app.id !== applicationId)
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

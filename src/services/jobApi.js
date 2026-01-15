import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const jobApi = {
  // Get all jobs (admin)
  getAllJobsAdmin: async (params = {}) => {
    try {
      const response = await api.get("/jobs/all", { params });
      return response.data;
    } catch (error) {
      console.error("Error fetching jobs (admin):", error);
      throw error;
    }
  },

  // Get all jobs
  getAllJobs: async (params = {}) => {
    try {
      const response = await api.get("/jobs", { params });
      return response.data;
    } catch (error) {
      console.error("Error fetching jobs:", error);
      throw error;
    }
  },

  // Get single job
  getJobById: async (id) => {
    try {
      const response = await api.get(`/jobs/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching job:", error);
      throw error;
    }
  },

  // Create new job
  createJob: async (jobData) => {
    try {
      const response = await api.post("/jobs", jobData);
      return response.data;
    } catch (error) {
      console.error("Error creating job:", error);
      throw error;
    }
  },

  // Update job
  updateJob: async (id, jobData) => {
    try {
      const response = await api.put(`/jobs/${id}`, jobData);
      return response.data;
    } catch (error) {
      console.error("Error updating job:", error);
      throw error;
    }
  },

  // Delete job
  deleteJob: async (id) => {
    try {
      const response = await api.delete(`/jobs/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting job:", error);
      throw error;
    }
  },

  // Update job status (for admin approval/rejection)
  updateJobStatus: async (id, statusOrPayload) => {
    try {
      const payload =
        typeof statusOrPayload === "string"
          ? { status: statusOrPayload }
          : statusOrPayload;
      const response = await api.patch(`/jobs/${id}/status`, payload);
      return response.data;
    } catch (error) {
      console.error("Error updating job status:", error);
      throw error;
    }
  },
};

export default jobApi;

import axios from "axios";

const API_BASE_URL = "http://localhost:3001/api";

export const applicationService = {
  // Get all applications (admin/employer)
  getAllApplications: async (params = {}) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/applications`, {
        params,
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching applications:", error);
      throw error;
    }
  },

  // Get single application
  getApplicationById: async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/applications/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching application:", error);
      throw error;
    }
  },

  // Submit application
  submitApplication: async (applicationData) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/applications`,
        applicationData
      );
      return response.data;
    } catch (error) {
      console.error("Error submitting application:", error);
      throw error;
    }
  },

  // Update application status
  updateApplicationStatus: async (id, statusData) => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/applications/${id}/status`,
        statusData
      );
      return response.data;
    } catch (error) {
      console.error("Error updating application status:", error);
      throw error;
    }
  },

  // Get applications by email
  getApplicationsByEmail: async (email) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/applications/email/${email}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching applications by email:", error);
      throw error;
    }
  },

  // Delete application
  deleteApplication: async (id) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/applications/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting application:", error);
      throw error;
    }
  },
};

import axios from "axios";

const API_BASE_URL = `${
  import.meta.env.VITE_API_URL || "http://localhost:3001"
}/api`;

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const applicationService = {
  // Get all applications (admin/employer)
  getAllApplications: async (params = {}) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/applications`, {
        params,
        headers: {
          ...getAuthHeaders(),
        },
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
      const response = await axios.get(`${API_BASE_URL}/applications/${id}`, {
        headers: {
          ...getAuthHeaders(),
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching application:", error);
      throw error;
    }
  },

  // Submit application - REQUIRES AUTHENTICATED USER
  submitApplication: async (applicationData) => {
    try {
      // Only send fields that are needed - user data will come from authentication
      const {
        jobId,
        applicantPhone,
        coverLetter,
        experience,
        education,
        skills,
        expectedSalary,
        availability,
      } = applicationData;

      const response = await axios.post(
        `${API_BASE_URL}/applications`,
        {
          jobId,
          applicantPhone,
          coverLetter,
          experience,
          education,
          skills,
          expectedSalary,
          availability,
        },
        {
          headers: {
            ...getAuthHeaders(),
          },
        }
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
        statusData,
        {
          headers: {
            ...getAuthHeaders(),
          },
        }
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

  // Get applications by job ID
  getApplicationsByJobId: async (jobId) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/applications?jobId=${jobId}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching applications by job ID:", error);
      throw error;
    }
  },

  // Delete application
  deleteApplication: async (id) => {
    try {
      const response = await axios.delete(
        `${API_BASE_URL}/applications/${id}`,
        {
          headers: {
            ...getAuthHeaders(),
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error deleting application:", error);
      throw error;
    }
  },
};

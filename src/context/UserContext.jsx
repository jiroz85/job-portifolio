import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const UserContext = createContext();

export const useUsers = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUsers must be used within a UserProvider");
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [userStats, setUserStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Get auth token
  const getAuthConfig = () => {
    const token = localStorage.getItem("token");
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  };

  // Fetch all users
  const fetchUsers = async (params = {}) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get("/api/users", {
        ...getAuthConfig(),
        params,
      });
      setUsers(response.data.data.users);
      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.error || "Failed to fetch users";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Fetch user statistics
  const fetchUserStats = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        "/api/users/statistics",
        getAuthConfig()
      );
      setUserStats(response.data.data);
      return response.data;
    } catch (err) {
      const errorMessage =
        err.response?.data?.error || "Failed to fetch user statistics";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Get user by ID
  const getUserById = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`/api/users/${id}`, getAuthConfig());
      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.error || "Failed to fetch user";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Get user activity
  const getUserActivity = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `/api/users/${id}/activity`,
        getAuthConfig()
      );
      return response.data;
    } catch (err) {
      const errorMessage =
        err.response?.data?.error || "Failed to fetch user activity";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Update user
  const updateUser = async (id, userData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.put(
        `/api/users/${id}`,
        userData,
        getAuthConfig()
      );

      // Update user in local state
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === id ? { ...user, ...response.data.data } : user
        )
      );

      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.error || "Failed to update user";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Update user role
  const updateUserRole = async (id, role) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.put(
        `/api/users/${id}/role`,
        { role },
        getAuthConfig()
      );

      // Update user in local state
      setUsers((prevUsers) =>
        prevUsers.map((user) => (user.id === id ? { ...user, role } : user))
      );

      return response.data;
    } catch (err) {
      const errorMessage =
        err.response?.data?.error || "Failed to update user role";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Update user status
  const updateUserStatus = async (id, status) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.put(
        `/api/users/${id}/status`,
        { status },
        getAuthConfig()
      );

      // Update user in local state
      setUsers((prevUsers) =>
        prevUsers.map((user) => (user.id === id ? { ...user, status } : user))
      );

      return response.data;
    } catch (err) {
      const errorMessage =
        err.response?.data?.error || "Failed to update user status";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Delete user
  const deleteUser = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.delete(`/api/users/${id}`, getAuthConfig());

      // Remove user from local state
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));

      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.error || "Failed to delete user";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Get all users (for admin management)
  const getAllUsers = () => {
    return users;
  };

  // Get user statistics
  const getUserStatistics = () => {
    return userStats;
  };

  // Initialize with mock data for development
  useEffect(() => {
    // Mock user data for development
    const mockUsers = [
      {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        role: "admin",
        status: "active",
        lastLogin: "2024-01-20T10:30:00Z",
        createdAt: "2024-01-15T08:00:00Z",
        applicationsCount: 5,
        savedJobsCount: 12,
      },
      {
        id: 2,
        name: "Jane Smith",
        email: "jane@example.com",
        role: "user",
        status: "active",
        lastLogin: "2024-01-19T15:45:00Z",
        createdAt: "2024-01-14T09:30:00Z",
        applicationsCount: 8,
        savedJobsCount: 6,
      },
      {
        id: 3,
        name: "Bob Johnson",
        email: "bob@example.com",
        role: "user",
        status: "blocked",
        lastLogin: "2024-01-18T11:20:00Z",
        createdAt: "2024-01-13T14:15:00Z",
        applicationsCount: 3,
        savedJobsCount: 2,
      },
      {
        id: 4,
        name: "Alice Brown",
        email: "alice@example.com",
        role: "employer",
        status: "active",
        lastLogin: "2024-01-20T09:10:00Z",
        createdAt: "2024-01-12T16:45:00Z",
        applicationsCount: 0,
        savedJobsCount: 0,
      },
    ];

    const mockStats = {
      totalUsers: 89,
      activeUsers: 75,
      inactiveUsers: 8,
      blockedUsers: 6,
      roleStats: [
        { role: "user", count: 65 },
        { role: "employer", count: 18 },
        { role: "admin", count: 6 },
      ],
      recentUsers: mockUsers.slice(0, 5),
      registrationTrend: [
        { date: "2024-01-01", count: 3 },
        { date: "2024-01-02", count: 5 },
        { date: "2024-01-03", count: 2 },
        { date: "2024-01-04", count: 7 },
        { date: "2024-01-05", count: 4 },
      ],
    };

    setUsers(mockUsers);
    setUserStats(mockStats);
  }, []);

  const value = {
    users,
    userStats,
    loading,
    error,
    fetchUsers,
    fetchUserStats,
    getUserById,
    getUserActivity,
    updateUser,
    updateUserRole,
    updateUserStatus,
    deleteUser,
    getAllUsers,
    getUserStatistics,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserContext;

import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Set auth token in axios headers
  const setAuthToken = (token) => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  };

  // Check if user is authenticated on initial load
  useEffect(() => {
    const checkAuth = async () => {
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        setToken(storedToken);
        setAuthToken(storedToken);
        try {
          // For now, skip the API call since there's no backend
          // In production, uncomment the following lines:
          // const response = await axios.get("/api/auth/me");
          // setUser(response.data.user);

          // For demo purposes, set a mock admin user if token exists
          // This ensures users can access the admin area for demo purposes
          const mockUser = {
            id: 1,
            name: "Admin User",
            email: "admin@example.com",
            role: "admin",
          };
          setUser(mockUser);
        } catch (err) {
          console.error("Authentication check failed:", err);
          logout();
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  // Login user
  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      // Mock authentication - accept any email/password for demo
      // In real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock user data based on email
      // You can make any user admin by adding their email to this list
      const adminEmails = [
        "admin@example.com",
        "john.doe@example.com", // Added for your use
        // Add more admin emails here as needed
      ];

      const isAdminUser =
        adminEmails.includes(email) || email.includes("admin");
      const mockUser = {
        id: isAdminUser ? 1 : 2,
        name: isAdminUser ? "Admin User" : "Regular User",
        email: email,
        role: isAdminUser ? "admin" : "user",
      };

      const mockToken = "mock-jwt-token-" + Date.now();

      // Save token to localStorage
      localStorage.setItem("token", mockToken);
      setToken(mockToken);
      setAuthToken(mockToken);
      setUser(mockUser);

      // Redirect based on user role
      const redirectPath = mockUser.role === "admin" ? "/admin" : "/dashboard";
      navigate(redirectPath);
      return { success: true };
    } catch (err) {
      const errorMessage = err.message || "Login failed. Please try again.";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Register user
  const register = async (userData) => {
    setLoading(true);
    setError(null);
    try {
      // For now, skip the API call since there's no backend
      // In production, uncomment the following lines:
      // const response = await axios.post("/api/auth/register", userData);
      // const { token, user } = response.data;

      // Mock registration
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const mockToken = "mock-jwt-token-" + Date.now();

      // Check if user should be admin based on email
      const adminEmails = [
        "admin@example.com",
        "john.doe@example.com", // Added for your use
        // Add more admin emails here as needed
      ];
      const isAdminUser =
        adminEmails.includes(userData.email) ||
        userData.email.includes("admin");
      const mockUser = {
        id: isAdminUser ? 1 : 2,
        name: userData.name || "New User",
        email: userData.email,
        role: isAdminUser ? "admin" : "user",
      };

      localStorage.setItem("token", mockToken);
      setToken(mockToken);
      setAuthToken(mockToken);
      setUser(mockUser);

      // Redirect based on user role
      const redirectPath = mockUser.role === "admin" ? "/admin" : "/dashboard";
      navigate(redirectPath);
      return { success: true };
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Registration failed. Please try again.";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Logout user
  const logout = () => {
    localStorage.removeItem("token");
    // Remove the Authorization header from axios
    delete axios.defaults.headers.common["Authorization"];
    setToken(null);
    setUser(null);
    navigate("/login");
  };

  // Update user profile
  const updateProfile = async (userData) => {
    try {
      // For now, skip the API call since there's no backend
      // In production, uncomment the following lines:
      // const response = await axios.put("/api/auth/profile", userData);
      // setUser(response.data.user);

      // Mock profile update
      await new Promise((resolve) => setTimeout(resolve, 500));
      setUser((prev) => ({ ...prev, ...userData }));
      return { success: true };
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Failed to update profile";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  // Check if user has specific role
  const hasRole = (role) => {
    return user?.role === role;
  };

  // Check if user has any of the specified roles
  const hasAnyRole = (roles) => {
    return roles.includes(user?.role);
  };

  // Check if user has all of the specified roles
  const hasAllRoles = (roles) => {
    return roles.every((role) => user?.role === role);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,
        isAdmin: user?.role === "admin",
        loading,
        error,
        login,
        register,
        logout,
        updateProfile,
        hasRole,
        hasAnyRole,
        hasAllRoles,
        setError,
      }}
    >
      {loading ? (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading...</p>
          </div>
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthContext;

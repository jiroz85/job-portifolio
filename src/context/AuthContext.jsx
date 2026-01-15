import React, { createContext, useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import authApi from "../services/authApi";

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

  // Logout user
  const logout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    // Remove the Authorization header from axios
    delete axios.defaults.headers.common["Authorization"];
    setToken(null);
    setUser(null);
    navigate("/login");
  }, [navigate]);

  // Check if user is authenticated on initial load
  useEffect(() => {
    const checkAuth = async () => {
      const storedToken = localStorage.getItem("token");

      if (
        storedToken &&
        storedToken !== "undefined" &&
        storedToken !== "null"
      ) {
        setToken(storedToken);
        setAuthToken(storedToken);
        try {
          // Verify token with backend
          const response = await authApi.getCurrentUser();
          if (response.success) {
            setUser(response.data);
          } else {
            // Token is invalid, clear it
            logout();
          }
        } catch (err) {
          console.error("Authentication check failed:", err);
          logout();
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, [logout]);

  // Login user
  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authApi.login(email, password);

      if (response.success) {
        const authData = response.data;
        const { token: newToken, ...userData } = authData;

        // Save token and user data
        localStorage.setItem("token", newToken);
        localStorage.setItem("user", JSON.stringify(userData));
        setToken(newToken);
        setAuthToken(newToken);
        setUser(userData);

        // Redirect based on user role
        const redirectPath =
          userData.role === "admin"
            ? "/admin"
            : userData.role === "employer"
            ? "/employer"
            : "/dashboard";
        navigate(redirectPath);

        return { success: true };
      } else {
        setError(response.error || "Login failed");
        return { success: false, error: response.error };
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.error || "Login failed. Please try again.";
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
      const response = await authApi.register(userData);

      if (response.success) {
        const authData = response.data;
        const { token: newToken, ...userResponseData } = authData;

        // Save token and user data
        localStorage.setItem("token", newToken);
        localStorage.setItem("user", JSON.stringify(userResponseData));
        setToken(newToken);
        setAuthToken(newToken);
        setUser(userResponseData);

        // Redirect based on user role
        const redirectPath =
          userResponseData.role === "admin"
            ? "/admin"
            : userResponseData.role === "employer"
            ? "/employer"
            : "/dashboard";
        navigate(redirectPath);

        return { success: true };
      } else {
        setError(response.error || "Registration failed");
        return { success: false, error: response.error };
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.error || "Registration failed. Please try again.";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Update user profile
  const updateProfile = async (userData) => {
    try {
      const response = await authApi.updateProfile(userData);
      if (response.success) {
        setUser((prev) => ({ ...prev, ...response.data }));
        // Update stored user data
        localStorage.setItem(
          "user",
          JSON.stringify({ ...user, ...response.data })
        );
      }
      return response;
    } catch (err) {
      const errorMessage =
        err.response?.data?.error || "Failed to update profile";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  // Change password
  const updatePassword = async (currentPassword, newPassword) => {
    try {
      const response = await authApi.changePassword(
        currentPassword,
        newPassword
      );
      return response;
    } catch (err) {
      const errorMessage =
        err.response?.data?.error || "Failed to change password";
      setError(errorMessage);
      throw new Error(errorMessage);
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
        updatePassword,
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

export default AuthContext;

import { useContext } from "react";
import AuthContext from "../context/AuthContext";

/**
 * Custom hook to access the authentication context
 * @returns {Object} Authentication context with user, token, and auth methods
 * @throws {Error} If used outside of an AuthProvider
 *
 * @example
 * const { user, isAuthenticated, login, logout } = useAuth();
 *
 * // Check if user is authenticated
 * if (isAuthenticated) {
 *   console.log('User is logged in:', user.email);
 * }
 *
 * // Login handler
 * const handleLogin = async (email, password) => {
 *   const { success, error } = await login(email, password);
 *   if (success) {
 *     // Redirect or show success message
 *   } else {
 *     // Show error message
 *     console.error(error);
 *   }
 * };
 *
 * // Check user role
 * const isAdmin = hasRole('admin');
 */
const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};

export default useAuth;

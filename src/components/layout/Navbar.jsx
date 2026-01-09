import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaBriefcase } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const isUserDashboard = location.pathname === "/dashboard";

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <FaBriefcase className="text-blue-600 text-2xl" />
            <span className="text-xl font-bold text-gray-800 dark:text-white">
              JobPortal
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            {!isUserDashboard && (
              <>
                <Link to="/" className="nav-link">
                  Home
                </Link>
                <Link to="/jobs" className="nav-link">
                  Browse Jobs
                </Link>
              </>
            )}
            {isAuthenticated ? (
              <>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="nav-link">
                  Login
                </Link>
                <Link to="/register" className="nav-link">
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button className="md:hidden text-gray-600 dark:text-gray-300">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

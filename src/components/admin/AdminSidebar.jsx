import { NavLink } from "react-router-dom";
import {
  FiHome,
  FiBriefcase,
  FiUsers,
  FiFileText,
  FiChevronRight,
  FiChevronDown,
} from "react-icons/fi";
import { useState } from "react";

const AdminSidebar = ({ isOpen = true, toggleSidebar }) => {
  const [dropdownOpen, setDropdownOpen] = useState({
    jobs: false,
    users: false,
  });

  const toggleDropdown = (menu) => {
    setDropdownOpen((prev) => ({
      ...prev,
      [menu]: !prev[menu],
    }));
  };
  return (
    <div
      className={`fixed inset-y-0 left-0 transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } w-64 bg-white shadow-lg z-10 transition-transform duration-300 ease-in-out lg:translate-x-0`}
    >
      <div className="flex items-center justify-center h-16 px-6 border-b border-gray-200">
        <h1 className="text-xl font-bold text-indigo-600">Admin Panel</h1>
      </div>

      <nav className="px-4 py-6">
        <ul className="space-y-2">
          <li>
            <NavLink
              to="/admin"
              end
              className={({ isActive }) =>
                `flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200 ${
                  isActive
                    ? "bg-indigo-50 text-indigo-600"
                    : "text-gray-600 hover:bg-gray-100"
                }`
              }
            >
              <FiHome className="w-5 h-5 mr-3" />
              <span>Dashboard</span>
            </NavLink>
          </li>

          <li>
            <button
              onClick={() => toggleDropdown("jobs")}
              className="flex items-center justify-between w-full px-4 py-3 text-sm font-medium text-left text-gray-600 rounded-lg hover:bg-gray-100 focus:outline-none"
            >
              <div className="flex items-center">
                <FiBriefcase className="w-5 h-5 mr-3" />
                <span>Job Management</span>
              </div>
              {dropdownOpen.jobs ? (
                <FiChevronDown className="w-4 h-4" />
              ) : (
                <FiChevronRight className="w-4 h-4" />
              )}
            </button>
            {dropdownOpen.jobs && (
              <ul className="mt-1 ml-8 space-y-1">
                <li>
                  <NavLink
                    to="/admin/jobs"
                    className={({ isActive }) =>
                      `block px-3 py-2 text-sm rounded-md ${
                        isActive
                          ? "text-indigo-600 bg-indigo-50"
                          : "text-gray-600 hover:bg-gray-100"
                      }`
                    }
                  >
                    All Jobs
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/admin/jobs/add"
                    className={({ isActive }) =>
                      `block px-3 py-2 text-sm rounded-md ${
                        isActive
                          ? "text-indigo-600 bg-indigo-50"
                          : "text-gray-600 hover:bg-gray-100"
                      }`
                    }
                  >
                    Add New Job
                  </NavLink>
                </li>
              </ul>
            )}
          </li>

          <li>
            <NavLink
              to="/admin/users"
              className={({ isActive }) =>
                `flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200 ${
                  isActive
                    ? "bg-indigo-50 text-indigo-600"
                    : "text-gray-600 hover:bg-gray-100"
                }`
              }
            >
              <FiUsers className="w-5 h-5 mr-3" />
              <span>User Management</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/admin/applications"
              className={({ isActive }) =>
                `flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200 ${
                  isActive
                    ? "bg-indigo-50 text-indigo-600"
                    : "text-gray-600 hover:bg-gray-100"
                }`
              }
            >
              <FiFileText className="w-5 h-5 mr-3" />
              <span>Application Management</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default AdminSidebar;

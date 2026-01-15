import { useState } from "react";
import {
  FiHome,
  FiBriefcase,
  FiUsers,
  FiFileText,
  FiChevronRight,
  FiChevronDown,
  FiBarChart2,
  FiSettings,
  FiBell,
} from "react-icons/fi";

const AdminSidebar = ({
  isOpen = true,
  toggleSidebar,
  activeSection,
  onSectionChange,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState({
    jobs: false,
    users: false,
    reports: false,
  });

  const toggleDropdown = (menu) => {
    setDropdownOpen((prev) => ({
      ...prev,
      [menu]: !prev[menu],
    }));
  };

  const handleSectionChange = (section) => {
    if (typeof onSectionChange === "function") {
      onSectionChange(section);
    }
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
            <button
              onClick={() => handleSectionChange("dashboard")}
              className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200 ${
                activeSection === "dashboard"
                  ? "bg-indigo-50 text-indigo-600"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <FiHome className="w-5 h-5 mr-3" />
              <span>Dashboard</span>
            </button>
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
                  <button
                    onClick={() => handleSectionChange("jobs")}
                    className={`block w-full text-left px-3 py-2 text-sm rounded-md ${
                      activeSection === "jobs"
                        ? "text-indigo-600 bg-indigo-50"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    All Jobs
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleSectionChange("add-job")}
                    className={`block w-full text-left px-3 py-2 text-sm rounded-md ${
                      activeSection === "add-job"
                        ? "text-indigo-600 bg-indigo-50"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    Add New Job
                  </button>
                </li>
              </ul>
            )}
          </li>

          <li>
            <button
              onClick={() => toggleDropdown("users")}
              className="flex items-center justify-between w-full px-4 py-3 text-sm font-medium text-left text-gray-600 rounded-lg hover:bg-gray-100 focus:outline-none"
            >
              <div className="flex items-center">
                <FiUsers className="w-5 h-5 mr-3" />
                <span>User Management</span>
              </div>
              {dropdownOpen.users ? (
                <FiChevronDown className="w-4 h-4" />
              ) : (
                <FiChevronRight className="w-4 h-4" />
              )}
            </button>
            {dropdownOpen.users && (
              <ul className="mt-1 ml-8 space-y-1">
                <li>
                  <button
                    onClick={() => handleSectionChange("users")}
                    className={`block w-full text-left px-3 py-2 text-sm rounded-md ${
                      activeSection === "users"
                        ? "text-indigo-600 bg-indigo-50"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    All Users
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleSectionChange("employers")}
                    className={`block w-full text-left px-3 py-2 text-sm rounded-md ${
                      activeSection === "employers"
                        ? "text-indigo-600 bg-indigo-50"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    Employers
                  </button>
                </li>
              </ul>
            )}
          </li>

          <li>
            <button
              onClick={() => handleSectionChange("reports")}
              className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200 ${
                activeSection === "reports"
                  ? "bg-indigo-50 text-indigo-600"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <FiBarChart2 className="w-5 h-5 mr-3" />
              <span>Reports & Analytics</span>
            </button>
          </li>

          <li>
            <button
              onClick={() => handleSectionChange("notifications")}
              className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200 ${
                activeSection === "notifications"
                  ? "bg-indigo-50 text-indigo-600"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <FiBell className="w-5 h-5 mr-3" />
              <span>Notifications</span>
            </button>
          </li>

          <li>
            <button
              onClick={() => handleSectionChange("settings")}
              className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200 ${
                activeSection === "settings"
                  ? "bg-indigo-50 text-indigo-600"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <FiSettings className="w-5 h-5 mr-3" />
              <span>System Settings</span>
            </button>
          </li>

          <li>
            <button
              onClick={() => handleSectionChange("applications")}
              className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200 ${
                activeSection === "applications"
                  ? "bg-indigo-50 text-indigo-600"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <FiFileText className="w-5 h-5 mr-3" />
              <span>Application Management</span>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default AdminSidebar;

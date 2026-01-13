import React, { useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import {
  FiBriefcase,
  FiUsers,
  FiFileText,
  FiBarChart2,
  FiSettings,
  FiMenu,
  FiX,
  FiHome,
  FiPlus,
  FiCalendar,
  FiTrendingUp,
} from "react-icons/fi";

const EmployerLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: "Dashboard", href: "/employer", icon: FiHome },
    { name: "Post Job", href: "/employer/post-job", icon: FiPlus },
    { name: "My Jobs", href: "/employer/jobs", icon: FiBriefcase },
    { name: "Applicants", href: "/employer/applicants", icon: FiUsers },
    { name: "Interviews", href: "/employer/interviews", icon: FiCalendar },
    { name: "Analytics", href: "/employer/analytics", icon: FiBarChart2 },
    { name: "Settings", href: "/employer/settings", icon: FiSettings },
  ];

  const isActive = (href) => {
    if (href === "/employer") {
      return location.pathname === href;
    }
    return location.pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-gray-50 lg:flex">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        >
          <div className="absolute inset-0 bg-gray-600 opacity-75"></div>
        </div>
      )}

      {/* Sidebar */}
      <div
        className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 lg:relative lg:flex-shrink-0
      `}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-900">Employer Portal</h1>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden">
            <FiX className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        <nav className="mt-6 px-3">
          <div className="space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`
                  group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors
                  ${
                    isActive(item.href)
                      ? "bg-blue-50 text-blue-700 border-r-2 border-blue-700"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }
                `}
              >
                <item.icon
                  className={`
                    mr-3 h-5 w-5 flex-shrink-0
                    ${
                      isActive(item.href)
                        ? "text-blue-700"
                        : "text-gray-400 group-hover:text-gray-500"
                    }
                  `}
                />
                {item.name}
              </Link>
            ))}
          </div>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Top header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden">
              <FiMenu className="w-6 h-6 text-gray-500" />
            </button>

            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-500">
                Welcome back, Employer
              </div>
              <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center">
                <span className="text-white text-sm font-medium">E</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default EmployerLayout;

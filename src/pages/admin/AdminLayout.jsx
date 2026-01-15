import React, { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminHeader from "../../components/admin/AdminHeader";

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Map current path to active section
  const getActiveSection = () => {
    const path = location.pathname;
    if (path === "/admin" || path === "/admin/") return "dashboard";
    if (path.startsWith("/admin/jobs"))
      return path.includes("add") ? "add-job" : "jobs";
    if (path.startsWith("/admin/users")) return "users";
    if (path.startsWith("/admin/employers")) return "employers";
    if (path.startsWith("/admin/applications")) return "applications";
    if (path.startsWith("/admin/reports")) return "reports";
    if (path.startsWith("/admin/settings")) return "settings";
    return "dashboard";
  };

  const handleSectionChange = (section) => {
    // Navigate to the appropriate route based on section
    const routes = {
      dashboard: "/admin",
      jobs: "/admin/jobs",
      "add-job": "/admin/jobs/add",
      users: "/admin/users",
      employers: "/admin/employers",
      applications: "/admin/applications",
      reports: "/admin/reports",
      settings: "/admin/settings",
      notifications: "/admin/notifications",
    };

    if (routes[section]) {
      navigate(routes[section]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminSidebar
        isOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
        activeSection={getActiveSection()}
        onSectionChange={handleSectionChange}
      />
      <div className="lg:pl-64">
        <AdminHeader toggleSidebar={toggleSidebar} />
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;

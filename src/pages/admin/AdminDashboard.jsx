import React, { useState, useEffect } from "react";
import {
  FiUsers,
  FiBriefcase,
  FiFileText,
  FiTrendingUp,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import AdminHeader from "../../components/admin/AdminHeader";
import AdminSidebar from "../../components/admin/AdminSidebar";
import DashboardStats from "../../components/admin/DashboardStats";
import UserManagementEnhanced from "../../components/admin/UserManagementEnhanced";
import JobManagement from "../../components/admin/JobManagement";
import ApplicationManagement from "../../components/admin/ApplicationManagement";

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("dashboard");
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalJobs: 0,
    totalApplications: 0,
    recentActivity: 0,
  });

  const fetchStats = async () => {
    try {
      // Mock stats data - replace with actual API calls
      setStats({
        totalUsers: 1234,
        totalJobs: 567,
        totalApplications: 890,
        recentActivity: 123,
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  useEffect(() => {
    fetchStats();
  }, [activeSection]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <DashboardStats stats={stats} />;
      case "users":
        return <UserManagementEnhanced />;
      case "jobs":
        return <JobManagement />;
      case "applications":
        return <ApplicationManagement />;
      default:
        return <DashboardStats stats={stats} />;
    }
  };

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: FiTrendingUp },
    { id: "users", label: "User Management", icon: FiUsers },
    { id: "jobs", label: "Job Management", icon: FiBriefcase },
    { id: "applications", label: "Applications", icon: FiFileText },
    { id: "settings", label: "Settings", icon: FiSettings },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader
        user={user}
        onLogout={handleLogout}
        title="Admin Dashboard"
      />

      <div className="flex">
        <AdminSidebar
          menuItems={menuItems}
          activeSection={activeSection}
          onSectionChange={setActiveSection}
        />

        <main className="flex-1 p-6">{renderContent()}</main>
      </div>
    </div>
  );
};

export default AdminDashboard;

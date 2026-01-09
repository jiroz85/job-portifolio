import React, { useState, useEffect } from "react";
import {
  FiBriefcase,
  FiUsers,
  FiFileText,
  FiTrendingUp,
  FiPlus,
  FiEye,
  FiClock,
  FiActivity,
  FiBarChart2,
} from "react-icons/fi";

const Dashboard = () => {
  const [stats, setStats] = useState([
    {
      title: "Total Jobs",
      value: "24",
      change: "+12%",
      changeType: "increase",
      icon: FiBriefcase,
      color: "bg-blue-500",
    },
    {
      title: "Total Applications",
      value: "156",
      change: "+23%",
      changeType: "increase",
      icon: FiFileText,
      color: "bg-green-500",
    },
    {
      title: "Total Users",
      value: "89",
      change: "+5%",
      changeType: "increase",
      icon: FiUsers,
      color: "bg-purple-500",
    },
    {
      title: "Active Jobs",
      value: "18",
      change: "-2%",
      changeType: "decrease",
      icon: FiTrendingUp,
      color: "bg-orange-500",
    },
  ]);

  const [recentActivities, setRecentActivities] = useState([
    {
      id: 1,
      type: "job_posted",
      message: "New job 'Senior React Developer' was posted",
      time: "2 hours ago",
      user: "John Doe",
    },
    {
      id: 2,
      type: "application_received",
      message: "New application received for 'Frontend Developer'",
      time: "4 hours ago",
      user: "Jane Smith",
    },
    {
      id: 3,
      type: "user_registered",
      message: "New user 'Alice Brown' registered",
      time: "6 hours ago",
      user: "System",
    },
    {
      id: 4,
      type: "job_updated",
      message: "Job 'UI/UX Designer' was updated",
      time: "8 hours ago",
      user: "Bob Johnson",
    },
    {
      id: 5,
      type: "application_reviewed",
      message: "Application for 'Full Stack Developer' was reviewed",
      time: "1 day ago",
      user: "Admin",
    },
  ]);

  useEffect(() => {
    // Simulate real-time data updates
    const interval = setInterval(() => {
      // Update stats with random variations
      setStats((prevStats) =>
        prevStats.map((stat) => ({
          ...stat,
          value: parseInt(stat.value) + Math.floor(Math.random() * 3) - 1,
          change: `${Math.random() > 0.5 ? "+" : "-"}${Math.floor(
            Math.random() * 20
          )}%`,
          changeType: Math.random() > 0.5 ? "increase" : "decrease",
        }))
      );
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const quickActions = [
    {
      title: "Add New Job",
      description: "Create a new job posting",
      icon: FiPlus,
      color: "bg-indigo-600",
      href: "/admin/jobs/add",
    },
    {
      title: "View All Jobs",
      description: "Manage existing job postings",
      icon: FiBriefcase,
      color: "bg-blue-600",
      href: "/admin/jobs",
    },
    {
      title: "Manage Users",
      description: "View and manage user accounts",
      icon: FiUsers,
      color: "bg-purple-600",
      href: "/admin/users",
    },
    {
      title: "View Applications",
      description: "Review job applications",
      icon: FiFileText,
      color: "bg-green-600",
      href: "/admin/applications",
    },
  ];

  const getActivityIcon = (type) => {
    switch (type) {
      case "job_posted":
        return <FiBriefcase className="w-4 h-4 text-blue-600" />;
      case "application_received":
        return <FiFileText className="w-4 h-4 text-green-600" />;
      case "user_registered":
        return <FiUsers className="w-4 h-4 text-purple-600" />;
      case "job_updated":
        return <FiEye className="w-4 h-4 text-orange-600" />;
      case "application_reviewed":
        return <FiClock className="w-4 h-4 text-gray-600" />;
      default:
        return <FiClock className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-600 mt-2">
          Welcome back! Here's what's happening with your job portal today.
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className={`${stat.color} rounded-lg p-3 mr-4`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600">
                  {stat.title}
                </p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <div className="flex items-center mt-1">
                  <span
                    className={`text-sm font-medium ${
                      stat.changeType === "increase"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {stat.change}
                  </span>
                  <span className="text-sm text-gray-500 ml-1">
                    from last month
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activities */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">
                Recent Activities
              </h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <div className="flex-shrink-0 mt-1">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900">
                        {activity.message}
                      </p>
                      <div className="flex items-center mt-1 space-x-2">
                        <span className="text-xs text-gray-500">
                          {activity.user}
                        </span>
                        <span className="text-xs text-gray-400">•</span>
                        <span className="text-xs text-gray-500">
                          {activity.time}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Analytics Overview */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                <FiBarChart2 className="mr-2" />
                Analytics Overview
              </h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">
                    Today's Applications
                  </span>
                  <span className="text-sm font-semibold text-green-600">
                    +12
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">New Users</span>
                  <span className="text-sm font-semibold text-blue-600">
                    +5
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Jobs Posted</span>
                  <span className="text-sm font-semibold text-purple-600">
                    +3
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Conversion Rate</span>
                  <span className="text-sm font-semibold text-orange-600">
                    4.2%
                  </span>
                </div>
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">System Status</span>
                    <span className="flex items-center text-sm text-green-600">
                      <FiActivity className="mr-1" />
                      Healthy
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6">
        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Quick Actions
            </h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {quickActions.map((action, index) => (
                <a
                  key={index}
                  href={action.href}
                  className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center">
                    <div className={`${action.color} rounded-lg p-2 mr-3`}>
                      <action.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">
                        {action.title}
                      </h3>
                      <p className="text-xs text-gray-500 mt-1">
                        {action.description}
                      </p>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

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
  FiUserCheck,
  FiUserX,
  FiUserPlus,
} from "react-icons/fi";
import { useUsers } from "../../context/UserContext";
import { useJobs } from "../../context/JobContext";
import { useApplications } from "../../context/ApplicationContext";

const Dashboard = () => {
  const { getUserStatistics, fetchUserStats } = useUsers();
  const { getAllJobs } = useJobs();
  const { getAllApplications } = useApplications();
  const userStats = getUserStatistics();

  const [stats, setStats] = useState([
    {
      title: "Total Jobs",
      value: "0",
      change: "+12%",
      changeType: "increase",
      icon: FiBriefcase,
      color: "bg-blue-500",
    },
    {
      title: "Total Applications",
      value: "0",
      change: "+23%",
      changeType: "increase",
      icon: FiFileText,
      color: "bg-green-500",
    },
    {
      title: "Total Users",
      value: "0",
      change: "+5%",
      changeType: "increase",
      icon: FiUsers,
      color: "bg-purple-500",
    },
    {
      title: "Active Jobs",
      value: "0",
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
    // Load real data from contexts
    const loadData = () => {
      try {
        const userStats = getUserStatistics();
        const jobs = getAllJobs();
        const applications = getAllApplications();

        // Update stats with real data
        setStats([
          {
            title: "Total Jobs",
            value: jobs.length.toString(),
            change: "+12%",
            changeType: "increase",
            icon: FiBriefcase,
            color: "bg-blue-500",
          },
          {
            title: "Total Applications",
            value: applications.length.toString(),
            change: "+23%",
            changeType: "increase",
            icon: FiFileText,
            color: "bg-green-500",
          },
          {
            title: "Total Users",
            value: userStats?.totalUsers?.toString() || "0",
            change: "+5%",
            changeType: "increase",
            icon: FiUsers,
            color: "bg-purple-500",
          },
          {
            title: "Active Jobs",
            value: jobs
              .filter((job) => job.status === "Published")
              .length.toString(),
            change: "-2%",
            changeType: "decrease",
            icon: FiTrendingUp,
            color: "bg-orange-500",
          },
        ]);
      } catch (error) {
        console.error("Error loading dashboard data:", error);
      }
    };

    loadData();

    // Simulate real-time data updates
    const interval = setInterval(() => {
      loadData();
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, [getUserStatistics, getAllJobs, getAllApplications]);

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

          {/* User Statistics */}
          <div className="bg-white rounded-lg shadow mt-6">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                <FiUsers className="mr-2" />
                User Statistics
              </h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <FiUserCheck className="w-4 h-4 text-green-600 mr-2" />
                    <span className="text-sm text-gray-600">Active Users</span>
                  </div>
                  <span className="text-sm font-semibold text-green-600">
                    {userStats?.activeUsers || 0}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <FiUserX className="w-4 h-4 text-red-600 mr-2" />
                    <span className="text-sm text-gray-600">Blocked Users</span>
                  </div>
                  <span className="text-sm font-semibold text-red-600">
                    {userStats?.blockedUsers || 0}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <FiUserPlus className="w-4 h-4 text-blue-600 mr-2" />
                    <span className="text-sm text-gray-600">New This Week</span>
                  </div>
                  <span className="text-sm font-semibold text-blue-600">
                    +8
                  </span>
                </div>
                <div className="pt-4 border-t border-gray-200">
                  <div className="text-xs text-gray-500">
                    User Roles Distribution
                  </div>
                  <div className="mt-2 space-y-1">
                    {userStats?.roleStats?.map((role, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between"
                      >
                        <span className="text-xs text-gray-600 capitalize">
                          {role.role}s
                        </span>
                        <span className="text-xs font-semibold text-gray-900">
                          {role.count}
                        </span>
                      </div>
                    ))}
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

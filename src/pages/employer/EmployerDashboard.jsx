import React, { useState, useEffect } from "react";
import {
  FiBriefcase,
  FiUsers,
  FiFileText,
  FiTrendingUp,
  FiEye,
  FiCalendar,
  FiClock,
  FiPlus,
  FiActivity,
} from "react-icons/fi";

const EmployerDashboard = () => {
  const [stats, setStats] = useState([
    {
      title: "Active Jobs",
      value: "0",
      change: "+2",
      changeType: "increase",
      icon: FiBriefcase,
      color: "bg-blue-500",
    },
    {
      title: "Total Applicants",
      value: "0",
      change: "+12",
      changeType: "increase",
      icon: FiUsers,
      color: "bg-green-500",
    },
    {
      title: "Interviews Scheduled",
      value: "0",
      change: "+3",
      changeType: "increase",
      icon: FiCalendar,
      color: "bg-purple-500",
    },
    {
      title: "Pending Reviews",
      value: "0",
      change: "-1",
      changeType: "decrease",
      icon: FiFileText,
      color: "bg-orange-500",
    },
  ]);

  const [recentApplications, setRecentApplications] = useState([
    {
      id: 1,
      applicantName: "John Doe",
      jobTitle: "Senior React Developer",
      appliedDate: "2 hours ago",
      status: "pending",
      avatar: "JD",
    },
    {
      id: 2,
      applicantName: "Jane Smith",
      jobTitle: "Frontend Developer",
      appliedDate: "4 hours ago",
      status: "reviewing",
      avatar: "JS",
    },
    {
      id: 3,
      applicantName: "Mike Johnson",
      jobTitle: "UI/UX Designer",
      appliedDate: "1 day ago",
      status: "interview",
      avatar: "MJ",
    },
  ]);

  const [jobPerformance, setJobPerformance] = useState([
    {
      title: "Senior React Developer",
      views: 245,
      applications: 18,
      conversionRate: "7.3%",
      status: "active",
    },
    {
      title: "Frontend Developer",
      views: 189,
      applications: 12,
      conversionRate: "6.3%",
      status: "active",
    },
    {
      title: "UI/UX Designer",
      views: 156,
      applications: 8,
      conversionRate: "5.1%",
      status: "active",
    },
  ]);

  const quickActions = [
    {
      title: "Post New Job",
      description: "Create a new job posting",
      icon: FiPlus,
      color: "bg-indigo-600",
      href: "/employer/post-job",
    },
    {
      title: "View Applicants",
      description: "Review job applications",
      icon: FiUsers,
      color: "bg-green-600",
      href: "/employer/applicants",
    },
    {
      title: "Schedule Interviews",
      description: "Manage interview calendar",
      icon: FiCalendar,
      color: "bg-purple-600",
      href: "/employer/interviews",
    },
    {
      title: "View Analytics",
      description: "Track job performance",
      icon: FiTrendingUp,
      color: "bg-blue-600",
      href: "/employer/analytics",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "reviewing":
        return "bg-blue-100 text-blue-800";
      case "interview":
        return "bg-purple-100 text-purple-800";
      case "hired":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Employer Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Manage your job postings and track applicant progress.
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
                    from last week
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Applications */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">
                Recent Applications
              </h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentApplications.map((application) => (
                  <div
                    key={application.id}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center">
                        <span className="text-white text-sm font-medium">
                          {application.avatar}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {application.applicantName}
                        </p>
                        <p className="text-sm text-gray-500">
                          {application.jobTitle}
                        </p>
                        <p className="text-xs text-gray-400">
                          {application.appliedDate}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                          application.status
                        )}`}
                      >
                        {application.status}
                      </span>
                      <button className="text-blue-600 hover:text-blue-800">
                        <FiEye className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Job Performance */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">
                Job Performance
              </h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {jobPerformance.map((job, index) => (
                  <div
                    key={index}
                    className="border-b border-gray-200 pb-4 last:border-0"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-sm font-medium text-gray-900">
                        {job.title}
                      </h3>
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                        {job.status}
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div className="text-center">
                        <p className="text-gray-500">Views</p>
                        <p className="font-semibold">{job.views}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-gray-500">Applications</p>
                        <p className="font-semibold">{job.applications}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-gray-500">Conversion</p>
                        <p className="font-semibold">{job.conversionRate}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8">
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

export default EmployerDashboard;

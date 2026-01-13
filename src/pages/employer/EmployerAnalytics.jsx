import React, { useState } from "react";
import {
  FiTrendingUp,
  FiUsers,
  FiBriefcase,
  FiEye,
  FiCalendar,
  FiBarChart2,
  FiPieChart,
  FiActivity,
  FiFilter,
  FiDownload,
} from "react-icons/fi";

const EmployerAnalytics = () => {
  const [timeRange, setTimeRange] = useState("30days");
  const [selectedMetric, setSelectedMetric] = useState("overview");

  const timeRanges = [
    { value: "7days", label: "Last 7 days" },
    { value: "30days", label: "Last 30 days" },
    { value: "90days", label: "Last 90 days" },
    { value: "1year", label: "Last year" },
  ];

  const overviewStats = [
    {
      title: "Total Job Views",
      value: "12,543",
      change: "+23%",
      changeType: "increase",
      icon: FiEye,
      color: "bg-blue-500",
    },
    {
      title: "Total Applications",
      value: "847",
      change: "+15%",
      changeType: "increase",
      icon: FiUsers,
      color: "bg-green-500",
    },
    {
      title: "Active Jobs",
      value: "12",
      change: "+2",
      changeType: "increase",
      icon: FiBriefcase,
      color: "bg-purple-500",
    },
    {
      title: "Conversion Rate",
      value: "6.8%",
      change: "+0.5%",
      changeType: "increase",
      icon: FiTrendingUp,
      color: "bg-orange-500",
    },
  ];

  const jobPerformanceData = [
    {
      title: "Senior React Developer",
      views: 3421,
      applications: 89,
      conversionRate: "2.6%",
      status: "active",
      trend: "up",
    },
    {
      title: "Frontend Developer",
      views: 2156,
      applications: 67,
      conversionRate: "3.1%",
      status: "active",
      trend: "up",
    },
    {
      title: "UI/UX Designer",
      views: 1876,
      applications: 45,
      conversionRate: "2.4%",
      status: "paused",
      trend: "down",
    },
    {
      title: "Backend Developer",
      views: 1543,
      applications: 38,
      conversionRate: "2.5%",
      status: "active",
      trend: "stable",
    },
    {
      title: "DevOps Engineer",
      views: 987,
      applications: 28,
      conversionRate: "2.8%",
      status: "filled",
      trend: "up",
    },
  ];

  const applicationTrends = [
    { date: "2024-01-01", applications: 12, views: 234 },
    { date: "2024-01-02", applications: 18, views: 312 },
    { date: "2024-01-03", applications: 15, views: 289 },
    { date: "2024-01-04", applications: 22, views: 445 },
    { date: "2024-01-05", applications: 19, views: 367 },
    { date: "2024-01-06", applications: 25, views: 489 },
    { date: "2024-01-07", applications: 21, views: 401 },
  ];

  const sourceAnalytics = [
    { source: "Direct", applications: 234, percentage: 28 },
    { source: "LinkedIn", applications: 187, percentage: 22 },
    { source: "Indeed", applications: 156, percentage: 18 },
    { source: "Company Website", applications: 145, percentage: 17 },
    { source: "Referrals", applications: 125, percentage: 15 },
  ];

  const getTrendIcon = (trend) => {
    switch (trend) {
      case "up":
        return <FiTrendingUp className="w-4 h-4 text-green-500" />;
      case "down":
        return (
          <FiTrendingUp className="w-4 h-4 text-red-500 transform rotate-180" />
        );
      default:
        return <FiActivity className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "paused":
        return "bg-yellow-100 text-yellow-800";
      case "filled":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Analytics Dashboard
            </h1>
            <p className="text-gray-600 mt-2">
              Track your job performance and recruitment metrics.
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {timeRanges.map((range) => (
                <option key={range.value} value={range.value}>
                  {range.label}
                </option>
              ))}
            </select>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center">
              <FiDownload className="mr-2" />
              Export Report
            </button>
          </div>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {overviewStats.map((stat, index) => (
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
                    vs previous period
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Application Trends Chart */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                <FiBarChart2 className="mr-2" />
                Application Trends
              </h2>
            </div>
            <div className="p-6">
              <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                <div className="text-center text-gray-500">
                  <FiBarChart2 className="w-12 h-12 mx-auto mb-2" />
                  <p>Chart visualization would go here</p>
                  <p className="text-sm">Applications over time</p>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-7 gap-2">
                {applicationTrends.map((day, index) => (
                  <div key={index} className="text-center">
                    <div className="text-xs text-gray-500">
                      {new Date(day.date).getDate()}
                    </div>
                    <div className="mt-1 h-16 bg-gray-100 rounded relative">
                      <div
                        className="absolute bottom-0 left-0 right-0 bg-blue-500 rounded"
                        style={{ height: `${(day.applications / 25) * 100}%` }}
                      />
                    </div>
                    <div className="text-xs font-medium mt-1">
                      {day.applications}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Source Analytics */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                <FiPieChart className="mr-2" />
                Application Sources
              </h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {sourceAnalytics.map((source, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-900">
                        {source.source}
                      </span>
                      <span className="text-sm text-gray-500">
                        {source.applications} ({source.percentage}%)
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${source.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Job Performance Table */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            Job Performance Analysis
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Job Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Views
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Applications
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Conversion Rate
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trend
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {jobPerformanceData.map((job, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">
                      {job.title}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                        job.status
                      )}`}
                    >
                      {job.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      {job.views.toLocaleString()}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      {job.applications}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      {job.conversionRate}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      {getTrendIcon(job.trend)}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Key Insights */}
      <div className="mt-8 bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            Key Insights & Recommendations
          </h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center mb-2">
                <FiTrendingUp className="w-5 h-5 text-blue-600 mr-2" />
                <h3 className="font-medium text-blue-900">
                  Top Performing Job
                </h3>
              </div>
              <p className="text-sm text-blue-700">
                "Frontend Developer" has the highest conversion rate at 3.1%
              </p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="flex items-center mb-2">
                <FiUsers className="w-5 h-5 text-green-600 mr-2" />
                <h3 className="font-medium text-green-900">Best Source</h3>
              </div>
              <p className="text-sm text-green-700">
                Direct applications show highest quality candidates
              </p>
            </div>
            <div className="p-4 bg-orange-50 rounded-lg">
              <div className="flex items-center mb-2">
                <FiCalendar className="w-5 h-5 text-orange-600 mr-2" />
                <h3 className="font-medium text-orange-900">Peak Activity</h3>
              </div>
              <p className="text-sm text-orange-700">
                Most applications received on Tuesdays and Thursdays
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployerAnalytics;

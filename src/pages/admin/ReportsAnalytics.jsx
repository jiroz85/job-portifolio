import React, { useState } from "react";
import {
  FiBarChart2,
  FiTrendingUp,
  FiUsers,
  FiBriefcase,
  FiFileText,
  FiDownload,
  FiCalendar,
  FiFilter,
  FiChevronDown,
  FiEye,
  FiActivity,
  FiPieChart,
  FiClock,
} from "react-icons/fi";
import { useUsers } from "../../context/UserContext";
import { useJobs } from "../../context/JobContext";
import { useApplications } from "../../context/ApplicationContext";

const ReportsAnalytics = () => {
  const { getUserStatistics } = useUsers();
  const { getAllJobs } = useJobs();
  const { getAllApplications } = useApplications();

  const userStats = getUserStatistics();
  const jobs = getAllJobs();
  const applications = getAllApplications();

  const [dateRange, setDateRange] = useState("30days");
  const [reportType, setReportType] = useState("overview");

  // Mock analytics data
  const analyticsData = {
    overview: {
      totalUsers: userStats?.totalUsers || 0,
      totalJobs: jobs.length,
      totalApplications: applications.length,
      activeUsers: userStats?.activeUsers || 0,
      conversionRate: 4.2,
      averageResponseTime: "2.5 days",
    },
    jobAnalytics: {
      mostAppliedJobs: [
        { title: "Senior React Developer", applications: 45, views: 1200 },
        { title: "Frontend Developer", applications: 38, views: 980 },
        { title: "Full Stack Developer", applications: 32, views: 850 },
        { title: "UI/UX Designer", applications: 28, views: 720 },
        { title: "Backend Developer", applications: 25, views: 650 },
      ],
      jobsByCategory: [
        { category: "Engineering", count: 45, percentage: 45 },
        { category: "Design", count: 20, percentage: 20 },
        { category: "Marketing", count: 15, percentage: 15 },
        { category: "Sales", count: 12, percentage: 12 },
        { category: "Other", count: 8, percentage: 8 },
      ],
      applicationTrends: [
        { date: "2024-01-01", applications: 12 },
        { date: "2024-01-02", applications: 18 },
        { date: "2024-01-03", applications: 15 },
        { date: "2024-01-04", applications: 22 },
        { date: "2024-01-05", applications: 19 },
        { date: "2024-01-06", applications: 25 },
        { date: "2024-01-07", applications: 28 },
      ],
    },
    userAnalytics: {
      userGrowth: [
        { date: "2024-01-01", users: 50 },
        { date: "2024-01-07", users: 65 },
        { date: "2024-01-14", users: 78 },
        { date: "2024-01-21", users: 85 },
        { date: "2024-01-28", users: 89 },
      ],
      userActivity: [
        { day: "Monday", activeUsers: 45, applications: 12 },
        { day: "Tuesday", activeUsers: 52, applications: 18 },
        { day: "Wednesday", activeUsers: 48, applications: 15 },
        { day: "Thursday", activeUsers: 58, applications: 22 },
        { day: "Friday", activeUsers: 62, applications: 25 },
        { day: "Saturday", activeUsers: 28, applications: 8 },
        { day: "Sunday", activeUsers: 22, applications: 5 },
      ],
      userDemographics: {
        byRole: [
          { role: "Job Seekers", count: 65, percentage: 73 },
          { role: "Employers", count: 18, percentage: 20 },
          { role: "Admins", count: 6, percentage: 7 },
        ],
        byLocation: [
          { location: "United States", count: 35, percentage: 39 },
          { location: "India", count: 20, percentage: 22 },
          { location: "United Kingdom", count: 15, percentage: 17 },
          { location: "Canada", count: 12, percentage: 13 },
          { location: "Other", count: 7, percentage: 9 },
        ],
      },
    },
    applicationAnalytics: {
      statusBreakdown: [
        { status: "Applied", count: 156, percentage: 45 },
        { status: "Under Review", count: 69, percentage: 20 },
        { status: "Interview", count: 52, percentage: 15 },
        { status: "Offered", count: 35, percentage: 10 },
        { status: "Rejected", count: 26, percentage: 7.5 },
        { status: "Withdrawn", count: 8, percentage: 2.5 },
      ],
      averageTimeToHire: "18 days",
      responseRate: 78,
      interviewRate: 35,
      offerRate: 22,
    },
  };

  const handleExportReport = (format) => {
    // Mock export functionality
    console.log(`Exporting report as ${format}`);
    // In a real app, this would generate and download the report
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg mr-4">
              <FiUsers className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Total Users</p>
              <p className="text-2xl font-bold text-gray-900">
                {analyticsData.overview.totalUsers}
              </p>
              <p className="text-xs text-green-600">+12% from last month</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg mr-4">
              <FiBriefcase className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Total Jobs</p>
              <p className="text-2xl font-bold text-gray-900">
                {analyticsData.overview.totalJobs}
              </p>
              <p className="text-xs text-green-600">+8% from last month</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-lg mr-4">
              <FiFileText className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">
                Total Applications
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {analyticsData.overview.totalApplications}
              </p>
              <p className="text-xs text-green-600">+23% from last month</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 bg-orange-100 rounded-lg mr-4">
              <FiTrendingUp className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">
                Conversion Rate
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {analyticsData.overview.conversionRate}%
              </p>
              <p className="text-xs text-green-600">+0.5% from last month</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Application Trends */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <FiBarChart2 className="mr-2" />
            Application Trends
          </h3>
          <div className="space-y-3">
            {analyticsData.jobAnalytics.applicationTrends.map(
              (trend, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">{trend.date}</span>
                  <div className="flex items-center">
                    <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${(trend.applications / 30) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-900">
                      {trend.applications}
                    </span>
                  </div>
                </div>
              )
            )}
          </div>
        </div>

        {/* User Growth */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <FiUsers className="mr-2" />
            User Growth
          </h3>
          <div className="space-y-3">
            {analyticsData.userAnalytics.userGrowth.map((growth, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{growth.date}</span>
                <div className="flex items-center">
                  <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
                    <div
                      className="bg-green-600 h-2 rounded-full"
                      style={{ width: `${(growth.users / 100) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900">
                    {growth.users}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderJobAnalytics = () => (
    <div className="space-y-6">
      {/* Most Applied Jobs */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <FiBriefcase className="mr-2" />
          Most Applied Jobs
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Job Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Applications
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Views
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Conversion Rate
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {analyticsData.jobAnalytics.mostAppliedJobs.map((job, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {job.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {job.applications}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {job.views}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {((job.applications / job.views) * 100).toFixed(1)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Jobs by Category */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <FiPieChart className="mr-2" />
          Jobs by Category
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {analyticsData.jobAnalytics.jobsByCategory.map((category, index) => (
            <div key={index} className="text-center">
              <div className="relative inline-flex items-center justify-center w-20 h-20">
                <div className="text-2xl font-bold text-gray-900">
                  {category.percentage}%
                </div>
              </div>
              <p className="mt-2 text-sm font-medium text-gray-900">
                {category.category}
              </p>
              <p className="text-xs text-gray-500">{category.count} jobs</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderUserAnalytics = () => (
    <div className="space-y-6">
      {/* User Demographics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Users by Role
          </h3>
          <div className="space-y-3">
            {analyticsData.userAnalytics.userDemographics.byRole.map(
              (role, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">{role.role}</span>
                  <div className="flex items-center">
                    <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${role.percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-900">
                      {role.count}
                    </span>
                  </div>
                </div>
              )
            )}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Users by Location
          </h3>
          <div className="space-y-3">
            {analyticsData.userAnalytics.userDemographics.byLocation.map(
              (location, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">
                    {location.location}
                  </span>
                  <div className="flex items-center">
                    <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
                      <div
                        className="bg-green-600 h-2 rounded-full"
                        style={{ width: `${location.percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-900">
                      {location.count}
                    </span>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>

      {/* User Activity by Day */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <FiActivity className="mr-2" />
          User Activity by Day
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Day
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Active Users
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Applications
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {analyticsData.userAnalytics.userActivity.map(
                (activity, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {activity.day}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {activity.activeUsers}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {activity.applications}
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderApplicationAnalytics = () => (
    <div className="space-y-6">
      {/* Application Status Breakdown */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <FiFileText className="mr-2" />
          Application Status Breakdown
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {analyticsData.applicationAnalytics.statusBreakdown.map(
            (status, index) => (
              <div
                key={index}
                className="text-center p-4 border border-gray-200 rounded-lg"
              >
                <div className="text-2xl font-bold text-gray-900">
                  {status.count}
                </div>
                <p className="text-sm font-medium text-gray-900 mt-1">
                  {status.status}
                </p>
                <p className="text-xs text-gray-500">
                  {status.percentage}% of total
                </p>
              </div>
            )
          )}
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg mr-4">
              <FiClock className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">
                Avg. Time to Hire
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {analyticsData.applicationAnalytics.averageTimeToHire}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg mr-4">
              <FiEye className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Response Rate</p>
              <p className="text-2xl font-bold text-gray-900">
                {analyticsData.applicationAnalytics.responseRate}%
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-lg mr-4">
              <FiTrendingUp className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">
                Interview Rate
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {analyticsData.applicationAnalytics.interviewRate}%
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Reports & Analytics
        </h1>
        <p className="text-gray-600 mt-2">
          Comprehensive insights into job portal performance and user behavior
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date Range
            </label>
            <div className="relative">
              <select
                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
              >
                <option value="7days">Last 7 Days</option>
                <option value="30days">Last 30 Days</option>
                <option value="90days">Last 90 Days</option>
                <option value="1year">Last Year</option>
                <option value="all">All Time</option>
              </select>
              <FiChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>

          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Report Type
            </label>
            <div className="relative">
              <select
                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
              >
                <option value="overview">Overview</option>
                <option value="jobs">Job Analytics</option>
                <option value="users">User Analytics</option>
                <option value="applications">Application Analytics</option>
              </select>
              <FiChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>

          <div className="flex items-end space-x-3">
            <button
              onClick={() => handleExportReport("pdf")}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center"
            >
              <FiDownload className="mr-2" />
              Export PDF
            </button>
            <button
              onClick={() => handleExportReport("excel")}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center"
            >
              <FiDownload className="mr-2" />
              Export Excel
            </button>
          </div>
        </div>
      </div>

      {/* Report Content */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          {reportType === "overview" && renderOverview()}
          {reportType === "jobs" && renderJobAnalytics()}
          {reportType === "users" && renderUserAnalytics()}
          {reportType === "applications" && renderApplicationAnalytics()}
        </div>
      </div>
    </div>
  );
};

export default ReportsAnalytics;

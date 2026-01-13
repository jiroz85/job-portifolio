import React, { useState } from "react";
import {
  FiSearch,
  FiEdit2,
  FiTrash2,
  FiEye,
  FiCheck,
  FiX,
  FiBriefcase,
  FiMail,
  FiPhone,
  FiMapPin,
  FiCalendar,
  FiFilter,
  FiChevronDown,
  FiUsers,
  FiStar,
} from "react-icons/fi";
import { useUsers } from "../../context/UserContext";

const EmployerManagement = () => {
  const { getAllUsers, updateUserStatus, deleteUser } = useUsers();

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [selectedEmployer, setSelectedEmployer] = useState(null);
  const [newStatus, setNewStatus] = useState("");
  const [employerDetails, setEmployerDetails] = useState(null);

  const allUsers = getAllUsers();
  const employers = allUsers.filter((user) => user.role === "employer");

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "inactive":
        return "bg-yellow-100 text-yellow-800";
      case "blocked":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleViewEmployer = (employer) => {
    // Mock employer details - in real app, this would come from API
    const mockDetails = {
      ...employer,
      companyName: "Tech Corp",
      industry: "Technology",
      companySize: "100-500",
      website: "https://techcorp.com",
      description:
        "Leading technology company specializing in software development",
      foundedYear: "2010",
      headquarters: "San Francisco, CA",
      jobPostingsCount: 12,
      activeJobsCount: 8,
      totalApplications: 156,
      averageResponseTime: "2 days",
      featuredJobs: 3,
      subscriptionPlan: "Premium",
      subscriptionExpires: "2024-12-31",
    };
    setEmployerDetails(mockDetails);
    setShowDetailsModal(true);
  };

  const handleStatusChange = (employer) => {
    setSelectedEmployer(employer);
    setNewStatus(employer.status);
    setShowStatusModal(true);
  };

  const handleUpdateStatus = async () => {
    try {
      await updateUserStatus(selectedEmployer.id, newStatus);
      setShowStatusModal(false);
      setSelectedEmployer(null);
      setNewStatus("");
    } catch (error) {
      console.error("Error updating employer status:", error);
    }
  };

  const handleDeleteEmployer = async (employer) => {
    if (
      window.confirm(
        `Are you sure you want to delete ${employer.name} and all their job postings?`
      )
    ) {
      try {
        await deleteUser(employer.id);
      } catch (error) {
        console.error("Error deleting employer:", error);
      }
    }
  };

  const filteredEmployers = employers.filter((employer) => {
    const matchesSearch =
      employer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employer.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || employer.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Employer Management
        </h1>
        <p className="text-gray-600 mt-2">
          Manage employer accounts, job postings, and subscription plans
        </p>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search employers by name or email..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="relative">
            <select
              className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="blocked">Blocked</option>
            </select>
            <FiChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Employers Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Employer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Company
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Jobs Posted
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Plan
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Joined
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredEmployers.map((employer) => (
                <tr key={employer.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <FiBriefcase className="h-6 w-6 text-blue-600" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {employer.name}
                        </div>
                        <div className="text-sm text-gray-500 flex items-center">
                          <FiMail className="h-3 w-3 mr-1" />
                          {employer.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    Tech Corp
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                        employer.status
                      )}`}
                    >
                      {employer.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center">
                      <FiBriefcase className="h-3 w-3 mr-1" />
                      12
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-purple-100 text-purple-800">
                      Premium
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center">
                      <FiCalendar className="h-3 w-3 mr-1" />
                      {new Date(employer.createdAt).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleViewEmployer(employer)}
                        className="text-blue-600 hover:text-blue-900"
                        title="View Details"
                      >
                        <FiEye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleStatusChange(employer)}
                        className="text-yellow-600 hover:text-yellow-900"
                        title="Change Status"
                      >
                        <FiEdit2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteEmployer(employer)}
                        className="text-red-600 hover:text-red-900"
                        title="Delete Employer"
                      >
                        <FiTrash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Employer Details Modal */}
      {showDetailsModal && employerDetails && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-2/3 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Employer Details
                </h3>
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <FiX className="h-6 w-6" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Company Information */}
                <div className="space-y-4">
                  <h4 className="text-md font-medium text-gray-900 border-b pb-2">
                    Company Information
                  </h4>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Company Name
                      </label>
                      <p className="mt-1 text-sm text-gray-900">
                        {employerDetails.companyName}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Industry
                      </label>
                      <p className="mt-1 text-sm text-gray-900">
                        {employerDetails.industry}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Company Size
                      </label>
                      <p className="mt-1 text-sm text-gray-900">
                        {employerDetails.companySize}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Founded
                      </label>
                      <p className="mt-1 text-sm text-gray-900">
                        {employerDetails.foundedYear}
                      </p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Description
                    </label>
                    <p className="mt-1 text-sm text-gray-900">
                      {employerDetails.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Website
                      </label>
                      <a
                        href={employerDetails.website}
                        className="mt-1 text-sm text-blue-600 hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {employerDetails.website}
                      </a>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Headquarters
                      </label>
                      <p className="mt-1 text-sm text-gray-900">
                        {employerDetails.headquarters}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Account Information */}
                <div className="space-y-4">
                  <h4 className="text-md font-medium text-gray-900 border-b pb-2">
                    Account Information
                  </h4>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Contact Person
                      </label>
                      <p className="mt-1 text-sm text-gray-900">
                        {employerDetails.name}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Email
                      </label>
                      <p className="mt-1 text-sm text-gray-900">
                        {employerDetails.email}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Status
                      </label>
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                          employerDetails.status
                        )}`}
                      >
                        {employerDetails.status}
                      </span>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Subscription
                      </label>
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-purple-100 text-purple-800">
                        {employerDetails.subscriptionPlan}
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Subscription Expires
                    </label>
                    <p className="mt-1 text-sm text-gray-900">
                      {employerDetails.subscriptionExpires}
                    </p>
                  </div>
                </div>
              </div>

              {/* Statistics */}
              <div className="mt-6 border-t pt-6">
                <h4 className="text-md font-medium text-gray-900 mb-4">
                  Job Posting Statistics
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-center">
                      <FiBriefcase className="h-8 w-8 text-blue-600 mr-3" />
                      <div>
                        <p className="text-2xl font-bold text-gray-900">
                          {employerDetails.jobPostingsCount}
                        </p>
                        <p className="text-sm text-gray-600">Total Jobs</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="flex items-center">
                      <FiCheck className="h-8 w-8 text-green-600 mr-3" />
                      <div>
                        <p className="text-2xl font-bold text-gray-900">
                          {employerDetails.activeJobsCount}
                        </p>
                        <p className="text-sm text-gray-600">Active Jobs</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <div className="flex items-center">
                      <FiUsers className="h-8 w-8 text-purple-600 mr-3" />
                      <div>
                        <p className="text-2xl font-bold text-gray-900">
                          {employerDetails.totalApplications}
                        </p>
                        <p className="text-sm text-gray-600">Applications</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <div className="flex items-center">
                      <FiStar className="h-8 w-8 text-yellow-600 mr-3" />
                      <div>
                        <p className="text-2xl font-bold text-gray-900">
                          {employerDetails.featuredJobs}
                        </p>
                        <p className="text-sm text-gray-600">Featured Jobs</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Status Change Modal */}
      {showStatusModal && selectedEmployer && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Change Employer Status
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Change status for {selectedEmployer.name}
              </p>

              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="blocked">Blocked</option>
              </select>

              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => setShowStatusModal(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdateStatus}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Update Status
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployerManagement;

import React, { useState, useEffect } from "react";
import {
  FiSearch,
  FiFilter,
  FiEye,
  FiDownload,
  FiCalendar,
  FiUser,
  FiBriefcase,
  FiMail,
  FiPhone,
} from "react-icons/fi";
import { applicationService } from "../../services/applicationService";

const ApplicationsManagement = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [jobFilter, setJobFilter] = useState("all");
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [newStatus, setNewStatus] = useState("");
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  // Load applications from API
  useEffect(() => {
    const loadApplications = async () => {
      try {
        const response = await applicationService.getAllApplications();
        if (response.success) {
          setApplications(response.data);
        }
      } catch (error) {
        console.error("Error loading applications:", error);
      } finally {
        setLoading(false);
      }
    };

    loadApplications();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "reviewing":
        return "bg-blue-100 text-blue-800";
      case "interview":
        return "bg-purple-100 text-purple-800";
      case "accepted":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleStatusChange = (application) => {
    setSelectedApplication(application);
    setNewStatus(application.status);
    setShowStatusModal(true);
  };

  const handleUpdateStatus = async () => {
    try {
      const response = await applicationService.updateApplicationStatus(
        selectedApplication.id,
        { status: newStatus }
      );

      if (response.success) {
        // Update the local state
        setApplications(
          applications.map((app) =>
            app.id === selectedApplication.id
              ? { ...app, status: newStatus }
              : app
          )
        );
        setShowStatusModal(false);
        setSelectedApplication(null);
        setNewStatus("");
      } else {
        throw new Error(response.error || "Failed to update status");
      }
    } catch (error) {
      console.error("Error updating application status:", error);
      alert(`Error updating status: ${error.message}`);
    }
  };

  const handleViewDetails = (application) => {
    setSelectedApplication(application);
    setShowDetailsModal(true);
  };

  const handleDownloadResume = (filename) => {
    // In a real app, this would download the actual file
    alert(`Downloading resume: ${filename}`);
  };

  // Get unique job titles for filter
  const uniqueJobs = [
    ...new Set(applications.map((app) => app.job?.title || app.jobTitle)),
  ];

  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      app.applicantName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.applicantEmail?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (app.job?.title || app.jobTitle)
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      (app.job?.company || app.company)
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "all" || app.status === statusFilter;
    const matchesJob =
      jobFilter === "all" || (app.job?.title || app.jobTitle) === jobFilter;

    return matchesSearch && matchesStatus && matchesJob;
  });

  if (loading) {
    return (
      <div className="p-6">
        <div className="text-center py-12">
          <div className="text-lg text-gray-600">Loading applications...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Application Management
            </h1>
            <p className="text-gray-600 mt-1">
              View all applications, update application status, filter and
              search applications
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-4 mb-6">
          <div className="flex-1 relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search applications by name, email, job, or company..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-2">
            <FiFilter className="text-gray-400" />
            <select
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="reviewing">Reviewing</option>
              <option value="interview">Interview</option>
              <option value="accepted">Accepted</option>
              <option value="rejected">Rejected</option>
            </select>
            <select
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={jobFilter}
              onChange={(e) => setJobFilter(e.target.value)}
            >
              <option value="all">All Jobs</option>
              {uniqueJobs.map((job) => (
                <option key={job} value={job}>
                  {job}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Applicant
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Job
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Applied Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredApplications.map((application) => (
                <tr key={application.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {application.applicantName}
                      </div>
                      <div className="text-sm text-gray-500">
                        {application.email}
                      </div>
                      <div className="text-xs text-gray-400">
                        {application.phone}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {application.jobTitle}
                      </div>
                      <div className="text-sm text-gray-500">
                        {application.company}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-900">
                      <FiCalendar className="w-4 h-4 mr-2 text-gray-400" />
                      {application.appliedDate}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleStatusChange(application)}
                      className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full cursor-pointer hover:opacity-80 ${getStatusColor(
                        application.status
                      )}`}
                    >
                      {application.status}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleViewDetails(application)}
                        className="text-indigo-600 hover:text-indigo-900"
                        title="View Details"
                      >
                        <FiEye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDownloadResume(application.resume)}
                        className="text-green-600 hover:text-green-900"
                        title="Download Resume"
                      >
                        <FiDownload className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Status Update Modal */}
      {showStatusModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Update Application Status
            </h3>
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">
                Applicant:{" "}
                <span className="font-medium">
                  {selectedApplication?.applicantName}
                </span>
              </p>
              <p className="text-sm text-gray-600 mb-4">
                Job:{" "}
                <span className="font-medium">
                  {selectedApplication?.jobTitle}
                </span>
              </p>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select New Status:
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
              >
                <option value="pending">Pending</option>
                <option value="reviewing">Reviewing</option>
                <option value="interview">Interview</option>
                <option value="accepted">Accepted</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowStatusModal(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateStatus}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                Update Status
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Application Details Modal */}
      {showDetailsModal && selectedApplication && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-10 mx-auto p-5 border w-2/3 max-w-4xl shadow-lg rounded-md bg-white max-h-screen overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-900">
                Application Details
              </h3>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <FiUser className="mr-2" /> Applicant Information
                </h4>
                <div className="space-y-2">
                  <p>
                    <span className="font-medium">Name:</span>{" "}
                    {selectedApplication.applicantName}
                  </p>
                  <p>
                    <span className="font-medium">Email:</span>{" "}
                    {selectedApplication.email}
                  </p>
                  <p>
                    <span className="font-medium">Phone:</span>{" "}
                    {selectedApplication.phone}
                  </p>
                  <p>
                    <span className="font-medium">Experience:</span>{" "}
                    {selectedApplication.experience}
                  </p>
                  <p>
                    <span className="font-medium">Education:</span>{" "}
                    {selectedApplication.education}
                  </p>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <FiBriefcase className="mr-2" /> Job Information
                </h4>
                <div className="space-y-2">
                  <p>
                    <span className="font-medium">Position:</span>{" "}
                    {selectedApplication.jobTitle}
                  </p>
                  <p>
                    <span className="font-medium">Company:</span>{" "}
                    {selectedApplication.company}
                  </p>
                  <p>
                    <span className="font-medium">Applied Date:</span>{" "}
                    {selectedApplication.appliedDate}
                  </p>
                  <p>
                    <span className="font-medium">Current Status:</span>
                    <span
                      className={`ml-2 px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                        selectedApplication.status
                      )}`}
                    >
                      {selectedApplication.status}
                    </span>
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h4 className="font-semibold text-gray-900 mb-3">Skills</h4>
              <div className="flex flex-wrap gap-2">
                {selectedApplication.skills.split(", ").map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <h4 className="font-semibold text-gray-900 mb-3">Cover Letter</h4>
              <div className="p-4 bg-gray-50 rounded-md">
                <p className="text-gray-700">
                  {selectedApplication.coverLetter}
                </p>
              </div>
            </div>

            <div className="mt-6">
              <h4 className="font-semibold text-gray-900 mb-3">Resume</h4>
              <button
                onClick={() => handleDownloadResume(selectedApplication.resume)}
                className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                <FiDownload className="mr-2" />
                Download {selectedApplication.resume}
              </button>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowDetailsModal(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setShowDetailsModal(false);
                  handleStatusChange(selectedApplication);
                }}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                Update Status
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApplicationsManagement;

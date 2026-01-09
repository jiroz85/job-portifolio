import React, { useState, useEffect } from "react";
import { FiDownload, FiEye, FiTrash2, FiFilter } from "react-icons/fi";
import DataTable from "./DataTable";
import useAdmin from "../../hooks/useAdmin";
import { toast } from "react-toastify";

const ApplicationManagement = () => {
  const {
    fetchApplications,
    updateApplicationStatus,
    deleteApplication,
    loading,
  } = useAdmin();
  const [applications, setApplications] = useState([]);
  const [filters, setFilters] = useState({
    status: "all",
    job: "all",
    dateRange: "all",
  });

  useEffect(() => {
    loadApplications();
  }, [filters]);

  const loadApplications = async () => {
    try {
      const data = await fetchApplications(filters);
      setApplications(data);
    } catch (error) {
      toast.error("Failed to load applications");
    }
  };

  const handleStatusChange = async (applicationId, status) => {
    try {
      await updateApplicationStatus(applicationId, status);
      setApplications(
        applications.map((app) =>
          app._id === applicationId ? { ...app, status } : app
        )
      );
      toast.success("Application status updated");
    } catch (error) {
      toast.error("Failed to update application status");
    }
  };

  const handleDelete = async (applicationId) => {
    if (window.confirm("Are you sure you want to delete this application?")) {
      try {
        await deleteApplication(applicationId);
        setApplications(
          applications.filter((app) => app._id !== applicationId)
        );
        toast.success("Application deleted successfully");
      } catch (error) {
        toast.error("Failed to delete application");
      }
    }
  };

  const handleViewResume = (resumeUrl) => {
    window.open(resumeUrl, "_blank");
  };

  const columns = [
    {
      key: "applicant",
      header: "Applicant",
      render: (app) => (
        <div>
          <div className="font-medium text-gray-900">{app.user?.name}</div>
          <div className="text-sm text-gray-500">{app.user?.email}</div>
        </div>
      ),
    },
    {
      key: "job",
      header: "Job Position",
      render: (app) => app.job?.title || "N/A",
    },
    {
      key: "appliedDate",
      header: "Applied On",
      render: (app) => new Date(app.createdAt).toLocaleDateString(),
    },
    {
      key: "status",
      header: "Status",
      render: (app) => (
        <select
          value={app.status}
          onChange={(e) => handleStatusChange(app._id, e.target.value)}
          className={`px-2 py-1 rounded text-xs font-medium ${
            app.status === "pending"
              ? "bg-yellow-100 text-yellow-800"
              : app.status === "reviewed"
              ? "bg-blue-100 text-blue-800"
              : app.status === "interview"
              ? "bg-purple-100 text-purple-800"
              : app.status === "accepted"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          <option value="pending">Pending</option>
          <option value="reviewed">Reviewed</option>
          <option value="interview">Interview</option>
          <option value="accepted">Accepted</option>
          <option value="rejected">Rejected</option>
        </select>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      render: (app) => (
        <div className="flex space-x-2">
          {app.resume && (
            <button
              onClick={() => handleViewResume(app.resume)}
              className="text-blue-600 hover:text-blue-800"
              title="View Resume"
            >
              <FiEye className="h-5 w-5" />
            </button>
          )}
          <button
            onClick={() => handleDelete(app._id)}
            className="text-red-600 hover:text-red-800"
            title="Delete Application"
          >
            <FiTrash2 className="h-5 w-5" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Job Applications</h2>

          <div className="flex flex-wrap gap-3 mt-4 md:mt-0">
            <div className="relative">
              <select
                value={filters.status}
                onChange={(e) =>
                  setFilters({ ...filters, status: e.target.value })
                }
                className="block appearance-none bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              >
                <option value="all">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="reviewed">Reviewed</option>
                <option value="interview">Interview</option>
                <option value="accepted">Accepted</option>
                <option value="rejected">Rejected</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <FiFilter className="h-4 w-4" />
              </div>
            </div>

            <div className="relative">
              <select
                value={filters.dateRange}
                onChange={(e) =>
                  setFilters({ ...filters, dateRange: e.target.value })
                }
                className="block appearance-none bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              >
                <option value="all">All Time</option>
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <FiFilter className="h-4 w-4" />
              </div>
            </div>

            <button
              onClick={() => window.print()}
              className="flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              <FiDownload className="mr-2 h-4 w-4" />
              Export
            </button>
          </div>
        </div>

        <DataTable
          columns={columns}
          data={applications}
          itemsPerPage={10}
          className="mt-4"
        />
      </div>
    </div>
  );
};

export default ApplicationManagement;

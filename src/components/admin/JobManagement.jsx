import React, { useState, useEffect } from "react";
import { DataTable } from "./DataTable";
import JobForm from "./JobForm";
import useAdmin from "../../hooks/useAdmin";
import { toast } from "react-toastify";

const JobManagement = () => {
  const { fetchJobs, deleteJob, loading, error } = useAdmin();
  const [jobs, setJobs] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    try {
      const data = await fetchJobs();
      setJobs(data);
    } catch (err) {
      toast.error(error || "Failed to load jobs");
    }
  };

  const handleDelete = async (jobId) => {
    if (window.confirm("Are you sure you want to delete this job?")) {
      try {
        await deleteJob(jobId);
        setJobs(jobs.filter((job) => job._id !== jobId));
        toast.success("Job deleted successfully");
      } catch (err) {
        toast.error("Failed to delete job");
      }
    }
  };

  const handleEdit = (job) => {
    setSelectedJob(job);
    setIsFormOpen(true);
  };

  const handleFormSubmit = () => {
    setIsFormOpen(false);
    setSelectedJob(null);
    loadJobs();
  };

  const columns = [
    { key: "title", header: "Job Title" },
    { key: "company", header: "Company" },
    { key: "location", header: "Location" },
    { key: "type", header: "Type" },
    { key: "status", header: "Status" },
  ];

  const jobData = jobs.map((job) => ({
    ...job,
    actions: (
      <div className="space-x-2">
        <button
          onClick={() => handleEdit(job)}
          className="text-blue-600 hover:text-blue-800"
        >
          Edit
        </button>
        <button
          onClick={() => handleDelete(job._id)}
          className="text-red-600 hover:text-red-800 ml-2"
        >
          Delete
        </button>
      </div>
    ),
  }));

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Job Management</h2>
          <button
            onClick={() => {
              setSelectedJob(null);
              setIsFormOpen(true);
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Add New Job
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <DataTable
            columns={[...columns, { key: "actions", header: "Actions" }]}
            data={jobData}
          />
        )}
      </div>

      {isFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">
                {selectedJob ? "Edit Job" : "Add New Job"}
              </h3>
              <button
                onClick={() => {
                  setIsFormOpen(false);
                  setSelectedJob(null);
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <JobForm
              job={selectedJob}
              onSuccess={handleFormSubmit}
              onCancel={() => {
                setIsFormOpen(false);
                setSelectedJob(null);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default JobManagement;

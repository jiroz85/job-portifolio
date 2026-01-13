import React, { createContext, useContext, useState, useEffect } from "react";

const ApplicationContext = createContext();

export const useApplications = () => {
  const context = useContext(ApplicationContext);
  if (!context) {
    throw new Error(
      "useApplications must be used within an ApplicationProvider"
    );
  }
  return context;
};

export const ApplicationProvider = ({ children }) => {
  const [applications, setApplications] = useState(() => {
    // Initialize with existing applications from localStorage or default empty array
    const savedApplications = localStorage.getItem("applications");
    return savedApplications ? JSON.parse(savedApplications) : [];
  });

  // Save applications to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("applications", JSON.stringify(applications));
  }, [applications]);

  // Submit a new job application
  const submitApplication = (applicationData) => {
    const newApplication = {
      id:
        applications.length > 0
          ? Math.max(...applications.map((app) => app.id)) + 1
          : 1,
      ...applicationData,
      status: "applied", // Initial status
      appliedDate: new Date().toISOString().split("T")[0],
      statusHistory: [
        {
          status: "applied",
          date: new Date().toISOString().split("T")[0],
          note: "Application submitted successfully",
        },
      ],
    };
    setApplications([...applications, newApplication]);
    return newApplication;
  };

  // Update application status
  const updateApplicationStatus = (applicationId, newStatus, note = "") => {
    setApplications(
      applications.map((app) =>
        app.id === applicationId
          ? {
              ...app,
              status: newStatus,
              statusHistory: [
                ...app.statusHistory,
                {
                  status: newStatus,
                  date: new Date().toISOString().split("T")[0],
                  note: note || `Status updated to ${newStatus}`,
                },
              ],
            }
          : app
      )
    );
  };

  // Get all applications (for admin)
  const getAllApplications = () => {
    return applications;
  };

  // Get applications by user email (for user dashboard)
  const getUserApplications = (userEmail) => {
    return applications.filter((app) => app.email === userEmail);
  };

  // Get applications by job ID (for job details)
  const getJobApplications = (jobId) => {
    return applications.filter((app) => app.jobId === jobId);
  };

  // Delete an application
  const deleteApplication = (applicationId) => {
    setApplications(applications.filter((app) => app.id !== applicationId));
  };

  // Check if user has already applied for a job
  const hasUserApplied = (userEmail, jobId) => {
    return applications.some(
      (app) => app.email === userEmail && app.jobId === jobId
    );
  };

  // Get status options for applications
  const getApplicationStatusOptions = () => {
    return [
      { value: "applied", label: "Applied", color: "blue" },
      { value: "viewed", label: "Viewed", color: "yellow" },
      { value: "shortlisted", label: "Shortlisted", color: "purple" },
      { value: "rejected", label: "Rejected", color: "red" },
      { value: "offered", label: "Offered", color: "green" },
    ];
  };

  const value = {
    applications,
    submitApplication,
    updateApplicationStatus,
    getAllApplications,
    getUserApplications,
    getJobApplications,
    deleteApplication,
    hasUserApplied,
    getApplicationStatusOptions,
  };

  return (
    <ApplicationContext.Provider value={value}>
      {children}
    </ApplicationContext.Provider>
  );
};

export default ApplicationContext;

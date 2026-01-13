import React, { createContext, useContext, useState, useEffect } from "react";

const SavedJobsContext = createContext();

export const useSavedJobs = () => {
  const context = useContext(SavedJobsContext);
  if (!context) {
    throw new Error("useSavedJobs must be used within a SavedJobsProvider");
  }
  return context;
};

export const SavedJobsProvider = ({ children }) => {
  const [savedJobs, setSavedJobs] = useState(() => {
    const savedJobsFromStorage = localStorage.getItem("savedJobs");
    return savedJobsFromStorage ? JSON.parse(savedJobsFromStorage) : [];
  });

  const [savedCompanies, setSavedCompanies] = useState(() => {
    const savedCompaniesFromStorage = localStorage.getItem("savedCompanies");
    return savedCompaniesFromStorage
      ? JSON.parse(savedCompaniesFromStorage)
      : [];
  });

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem("savedJobs", JSON.stringify(savedJobs));
  }, [savedJobs]);

  useEffect(() => {
    localStorage.setItem("savedCompanies", JSON.stringify(savedCompanies));
  }, [savedCompanies]);

  // Save a job
  const saveJob = (job) => {
    const isAlreadySaved = savedJobs.some((savedJob) => savedJob.id === job.id);
    if (!isAlreadySaved) {
      setSavedJobs((prev) => [
        ...prev,
        { ...job, savedAt: new Date().toISOString() },
      ]);
      return true;
    }
    return false;
  };

  // Unsave a job
  const unsaveJob = (jobId) => {
    setSavedJobs((prev) => prev.filter((job) => job.id !== jobId));
  };

  // Check if job is saved
  const isJobSaved = (jobId) => {
    return savedJobs.some((job) => job.id === jobId);
  };

  // Save a company
  const saveCompany = (company) => {
    const isAlreadySaved = savedCompanies.some(
      (savedCompany) => savedCompany.name === company.name
    );
    if (!isAlreadySaved) {
      setSavedCompanies((prev) => [
        ...prev,
        { ...company, savedAt: new Date().toISOString() },
      ]);
      return true;
    }
    return false;
  };

  // Unsave a company
  const unsaveCompany = (companyName) => {
    setSavedCompanies((prev) =>
      prev.filter((company) => company.name !== companyName)
    );
  };

  // Check if company is saved
  const isCompanySaved = (companyName) => {
    return savedCompanies.some((company) => company.name === companyName);
  };

  // Get saved jobs count
  const getSavedJobsCount = () => savedJobs.length;

  // Get saved companies count
  const getSavedCompaniesCount = () => savedCompanies.length;

  // Get recently saved jobs (last 7 days)
  const getRecentlySavedJobs = () => {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    return savedJobs
      .filter((job) => new Date(job.savedAt) > sevenDaysAgo)
      .sort((a, b) => new Date(b.savedAt) - new Date(a.savedAt));
  };

  // Get saved jobs by category/type
  const getSavedJobsByType = (type) => {
    return savedJobs.filter((job) => job.type === type);
  };

  // Clear all saved jobs
  const clearAllSavedJobs = () => {
    setSavedJobs([]);
  };

  // Clear all saved companies
  const clearAllSavedCompanies = () => {
    setSavedCompanies([]);
  };

  const value = {
    savedJobs,
    savedCompanies,
    saveJob,
    unsaveJob,
    isJobSaved,
    saveCompany,
    unsaveCompany,
    isCompanySaved,
    getSavedJobsCount,
    getSavedCompaniesCount,
    getRecentlySavedJobs,
    getSavedJobsByType,
    clearAllSavedJobs,
    clearAllSavedCompanies,
  };

  return (
    <SavedJobsContext.Provider value={value}>
      {children}
    </SavedJobsContext.Provider>
  );
};

export default SavedJobsContext;

import { useState } from "react";
import {
  FaSearch,
  FaMapMarkerAlt,
  FaBriefcase,
  FaClock,
  FaDollarSign,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { useJobs } from "../context/JobContext";

const JobsPage = () => {
  const { getPublishedJobs } = useJobs();
  const publishedJobs = getPublishedJobs();
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [filters, setFilters] = useState({
    type: "",
    experience: "",
  });

  // Filter published jobs based on search criteria
  const filteredJobs = publishedJobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.company.toLowerCase().includes(search.toLowerCase());
    const matchesLocation = job.location
      .toLowerCase()
      .includes(location.toLowerCase());
    const matchesType = !filters.type || job.type === filters.type;
    const matchesExperience =
      !filters.experience || job.experience === filters.experience;

    return matchesSearch && matchesLocation && matchesType && matchesExperience;
  });

  return (
    <div className="py-8 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        {/* Search and Filter Section */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h1 className="text-3xl font-bold mb-6">Find Your Dream Job</h1>

          {/* Search Bar */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="flex items-center bg-gray-100 rounded-lg px-4 py-2">
              <FaSearch className="text-gray-500 mr-2" />
              <input
                type="text"
                placeholder="Job title, company, or keywords"
                className="w-full bg-transparent outline-none"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="flex items-center bg-gray-100 rounded-lg px-4 py-2">
              <FaMapMarkerAlt className="text-gray-500 mr-2" />
              <input
                type="text"
                placeholder="Location"
                className="w-full bg-transparent outline-none"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <button className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors">
              Search Jobs
            </button>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4">
            <select
              className="border border-gray-300 rounded-md px-3 py-2 text-sm"
              value={filters.type}
              onChange={(e) => setFilters({ ...filters, type: e.target.value })}
            >
              <option value="">All Job Types</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
              <option value="Internship">Internship</option>
            </select>

            <select
              className="border border-gray-300 rounded-md px-3 py-2 text-sm"
              value={filters.experience}
              onChange={(e) =>
                setFilters({ ...filters, experience: e.target.value })
              }
            >
              <option value="">All Experience Levels</option>
              <option value="Entry Level">Entry Level</option>
              <option value="Mid Level">Mid Level</option>
              <option value="Senior Level">Senior Level</option>
            </select>
          </div>
        </div>

        {/* Job Listings */}
        <div className="space-y-4">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <Link key={job.id} to={`/jobs/${job.id}`} className="block">
                <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div className="mb-4 md:mb-0">
                      <h2 className="text-xl font-semibold text-gray-900">
                        {job.title}
                      </h2>
                      <p className="text-gray-600">{job.company}</p>
                      <div className="flex items-center mt-2 text-sm text-gray-500">
                        <FaMapMarkerAlt className="mr-1" />
                        <span className="mr-4">{job.location}</span>
                        <FaBriefcase className="mr-1" />
                        <span className="mr-4">{job.type}</span>
                        <FaDollarSign className="mr-1" />
                        <span>{job.salary}</span>
                      </div>
                    </div>
                    <div className="text-sm text-gray-500">
                      <FaClock className="inline mr-1" />
                      {job.posted}
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-gray-900">
                No jobs found
              </h3>
              <p className="mt-1 text-gray-500">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobsPage;

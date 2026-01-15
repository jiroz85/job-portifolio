import { useState } from "react";
import {
  FaSearch,
  FaMapMarkerAlt,
  FaBriefcase,
  FaClock,
  FaDollarSign,
  FaBuilding,
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
    salary: "",
    skills: "",
  });

  // Filter published jobs based on search criteria
  const filteredJobs = publishedJobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.company.toLowerCase().includes(search.toLowerCase()) ||
      (job.requirements &&
        job.requirements.toLowerCase().includes(search.toLowerCase()));
    const matchesLocation = job.location
      .toLowerCase()
      .includes(location.toLowerCase());
    const matchesType = !filters.type || job.type === filters.type;
    const matchesExperience =
      !filters.experience || job.experience === filters.experience;
    const matchesSalary =
      !filters.salary || checkSalaryRange(job.salary, filters.salary);
    const matchesSkills =
      !filters.skills ||
      (job.requirements &&
        job.requirements.toLowerCase().includes(filters.skills.toLowerCase()));

    return (
      matchesSearch &&
      matchesLocation &&
      matchesType &&
      matchesExperience &&
      matchesSalary &&
      matchesSkills
    );
  });

  // Helper function to check salary range
  const checkSalaryRange = (jobSalary, filterSalary) => {
    if (!jobSalary || !filterSalary) return true;

    // Extract numeric values from salary strings
    const jobSalaryMatch = jobSalary.match(/\$(\d+)k?/g);
    if (!jobSalaryMatch) return true;

    const jobMin =
      parseInt(jobSalaryMatch[0].replace(/\$|k/g, "")) *
      (jobSalaryMatch[0].includes("k") ? 1000 : 1);
    const jobMax =
      jobSalaryMatch.length > 1
        ? parseInt(jobSalaryMatch[1].replace(/\$|k/g, "")) *
          (jobSalaryMatch[1].includes("k") ? 1000 : 1)
        : jobMin;

    const filterMin = parseInt(filterSalary.split("-")[0]) * 1000;
    const filterMax = parseInt(filterSalary.split("-")[1]) * 1000;

    return jobMin >= filterMin && jobMax <= filterMax;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-blue-600 to-indigo-700 text-white overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-indigo-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-sm font-medium mb-6">
              <FaBriefcase className="mr-2" />
              {filteredJobs.length} Job{filteredJobs.length !== 1 ? "s" : ""}{" "}
              Available
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              <span className="block bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                Find Your Dream
              </span>
              <span className="block bg-gradient-to-r from-blue-100 to-white bg-clip-text text-transparent">
                Job Today
              </span>
            </h1>
            <p className="text-xl mb-12 max-w-2xl mx-auto text-blue-100">
              Discover thousands of job opportunities with advanced filtering
              and search capabilities
            </p>

            {/* Enhanced Search Bar */}
            <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-3 border border-white/20">
              <div className="flex flex-col lg:flex-row gap-3">
                <div className="flex-1 flex items-center px-6 py-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/20 transition-all duration-300">
                  <FaSearch className="text-blue-200 mr-3 text-lg" />
                  <input
                    type="text"
                    placeholder="Job title, company, or keywords"
                    className="w-full bg-transparent outline-none text-white placeholder-blue-200 text-lg"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
                <div className="flex-1 flex items-center px-6 py-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/20 transition-all duration-300">
                  <FaMapMarkerAlt className="text-blue-200 mr-3 text-lg" />
                  <input
                    type="text"
                    placeholder="Location or Remote"
                    className="w-full bg-transparent outline-none text-white placeholder-blue-200 text-lg"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
                <button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                  <span className="flex items-center">
                    <FaSearch className="mr-2" />
                    Search Jobs
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-4 items-center justify-center">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-700">
                Filters:
              </span>
            </div>
            <select
              className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
              value={filters.type}
              onChange={(e) => setFilters({ ...filters, type: e.target.value })}
            >
              <option value="">All Job Types</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
              <option value="Internship">Internship</option>
              <option value="Remote">Remote</option>
            </select>

            <select
              className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
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

            <select
              className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
              value={filters.salary}
              onChange={(e) =>
                setFilters({ ...filters, salary: e.target.value })
              }
            >
              <option value="">All Salary Ranges</option>
              <option value="0-50">Under $50k</option>
              <option value="50-80">$50k - $80k</option>
              <option value="80-120">$80k - $120k</option>
              <option value="120-150">$120k - $150k</option>
              <option value="150-200">$150k - $200k</option>
              <option value="200-999">$200k+</option>
            </select>

            <input
              type="text"
              placeholder="Filter by skills (e.g., React, Python)"
              className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
              value={filters.skills}
              onChange={(e) =>
                setFilters({ ...filters, skills: e.target.value })
              }
            />
          </div>
        </div>
      </section>

      {/* Job Listings */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {filteredJobs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredJobs.map((job, index) => (
                <Link
                  key={job.id}
                  to={`/jobs/${job.id}`}
                  className="group block bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden border border-gray-100"
                  style={{
                    animationDelay: `${index * 100}ms`,
                  }}
                >
                  {/* Card Header */}
                  <div className="relative h-2 bg-gradient-to-r from-blue-500 to-purple-500"></div>

                  <div className="p-8">
                    {/* Company Logo Placeholder */}
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                      <FaBriefcase className="text-2xl text-blue-600" />
                    </div>

                    {/* Job Title and Company */}
                    <div className="mb-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                        {job.title}
                      </h3>
                      <p className="text-gray-600 font-medium flex items-center">
                        <FaBuilding className="mr-2 text-gray-400" />
                        {job.company}
                      </p>
                    </div>

                    {/* Job Details */}
                    <div className="space-y-3 text-sm">
                      <div className="flex items-center text-gray-500 hover:text-blue-600 transition-colors duration-300">
                        <FaMapMarkerAlt className="mr-3 text-gray-400" />
                        <span className="font-medium">{job.location}</span>
                      </div>
                      <div className="flex items-center text-gray-500 hover:text-blue-600 transition-colors duration-300">
                        <FaBriefcase className="mr-3 text-gray-400" />
                        <span className="font-medium">{job.type}</span>
                      </div>
                      {job.salary && (
                        <div className="flex items-center text-gray-500 hover:text-green-600 transition-colors duration-300">
                          <FaDollarSign className="mr-3 text-gray-400" />
                          <span className="font-medium text-green-600">
                            {job.salary}
                          </span>
                        </div>
                      )}
                      <div className="flex items-center text-gray-500">
                        <FaClock className="mr-3 text-gray-400" />
                        <span className="font-medium">
                          {job.posted || "Recently posted"}
                        </span>
                      </div>
                    </div>

                    {/* Apply Button */}
                    <div className="mt-6 pt-6 border-t border-gray-100">
                      <button className="w-full py-3 px-4 bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 text-blue-600 font-semibold rounded-xl transition-all duration-300 group-hover:shadow-md">
                        View Details →
                      </button>
                    </div>
                  </div>

                  {/* Hover Effect Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="max-w-md mx-auto">
                <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FaSearch className="text-4xl text-gray-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  No jobs found
                </h3>
                <p className="text-gray-600 mb-8 text-lg">
                  Try adjusting your search or filter criteria to find more
                  opportunities
                </p>
                <button
                  onClick={() => {
                    setSearch("");
                    setLocation("");
                    setFilters({
                      type: "",
                      experience: "",
                      salary: "",
                      skills: "",
                    });
                  }}
                  className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                  Clear Filters
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default JobsPage;

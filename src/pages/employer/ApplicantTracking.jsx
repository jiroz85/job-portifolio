import React, { useState } from "react";
import {
  FiUsers,
  FiEye,
  FiDownload,
  FiMail,
  FiPhone,
  FiCalendar,
  FiMapPin,
  FiBriefcase,
  FiFilter,
  FiSearch,
  FiMoreVertical,
  FiCheckCircle,
  FiXCircle,
  FiClock,
  FiStar,
  FiMessageSquare,
} from "react-icons/fi";

const ApplicantTracking = () => {
  const [applicants, setApplicants] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@email.com",
      phone: "+1 (555) 123-4567",
      location: "San Francisco, CA",
      jobTitle: "Senior React Developer",
      company: "Tech Corp",
      appliedDate: "2024-01-12",
      status: "reviewing",
      experience: "5 years",
      skills: ["React", "JavaScript", "TypeScript", "Node.js"],
      education: "Bachelor of Computer Science",
      resume: "john_doe_resume.pdf",
      coverLetter:
        "Experienced React developer with a passion for building scalable applications...",
      rating: 4,
      notes: "Strong technical skills, good cultural fit",
      interviews: [
        { type: "Phone Screen", date: "2024-01-15", status: "completed" },
        {
          type: "Technical Interview",
          date: "2024-01-18",
          status: "scheduled",
        },
      ],
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@email.com",
      phone: "+1 (555) 987-6543",
      location: "Remote",
      jobTitle: "Frontend Developer",
      company: "Tech Corp",
      appliedDate: "2024-01-10",
      status: "interview",
      experience: "3 years",
      skills: ["Vue.js", "JavaScript", "CSS", "HTML"],
      education: "Master of Web Development",
      resume: "jane_smith_resume.pdf",
      coverLetter:
        "Creative frontend developer with expertise in modern JavaScript frameworks...",
      rating: 5,
      notes: "Excellent portfolio, great communication skills",
      interviews: [
        { type: "Phone Screen", date: "2024-01-13", status: "completed" },
        {
          type: "Technical Interview",
          date: "2024-01-17",
          status: "completed",
        },
        { type: "Final Interview", date: "2024-01-20", status: "scheduled" },
      ],
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike.johnson@email.com",
      phone: "+1 (555) 456-7890",
      location: "New York, NY",
      jobTitle: "UI/UX Designer",
      company: "Tech Corp",
      appliedDate: "2024-01-08",
      status: "pending",
      experience: "4 years",
      skills: ["Figma", "Sketch", "Adobe XD", "Prototyping"],
      education: "Bachelor of Design",
      resume: "mike_johnson_resume.pdf",
      coverLetter:
        "Passionate designer focused on user-centered design principles...",
      rating: 3,
      notes: "Good design skills, needs more technical experience",
      interviews: [],
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [jobFilter, setJobFilter] = useState("all");
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [showDropdown, setShowDropdown] = useState(null);

  const statusOptions = [
    "all",
    "pending",
    "reviewing",
    "interview",
    "offered",
    "rejected",
    "hired",
  ];
  const jobOptions = [
    "all",
    "Senior React Developer",
    "Frontend Developer",
    "UI/UX Designer",
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-gray-100 text-gray-800";
      case "reviewing":
        return "bg-blue-100 text-blue-800";
      case "interview":
        return "bg-purple-100 text-purple-800";
      case "offered":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      case "hired":
        return "bg-emerald-100 text-emerald-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return <FiClock className="w-4 h-4" />;
      case "reviewing":
        return <FiEye className="w-4 h-4" />;
      case "interview":
        return <FiCalendar className="w-4 h-4" />;
      case "offered":
        return <FiCheckCircle className="w-4 h-4" />;
      case "rejected":
        return <FiXCircle className="w-4 h-4" />;
      case "hired":
        return <FiStar className="w-4 h-4" />;
      default:
        return <FiClock className="w-4 h-4" />;
    }
  };

  const getRatingStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <FiStar
        key={i}
        className={`w-4 h-4 ${
          i < rating ? "text-yellow-400 fill-current" : "text-gray-300"
        }`}
      />
    ));
  };

  const filteredApplicants = applicants.filter((applicant) => {
    const matchesSearch =
      applicant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      applicant.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      applicant.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      applicant.skills.some((skill) =>
        skill.toLowerCase().includes(searchTerm.toLowerCase())
      );

    const matchesStatus =
      statusFilter === "all" || applicant.status === statusFilter;
    const matchesJob = jobFilter === "all" || applicant.jobTitle === jobFilter;

    return matchesSearch && matchesStatus && matchesJob;
  });

  const handleStatusChange = (applicantId, newStatus) => {
    setApplicants(
      applicants.map((applicant) =>
        applicant.id === applicantId
          ? { ...applicant, status: newStatus }
          : applicant
      )
    );
    setShowDropdown(null);
  };

  const toggleDropdown = (applicantId) => {
    setShowDropdown(showDropdown === applicantId ? null : applicantId);
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Applicant Tracking</h1>
        <p className="text-gray-600 mt-2">
          Manage and track all job applicants in one place.
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search applicants..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {status === "all"
                    ? "All Statuses"
                    : status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <select
              value={jobFilter}
              onChange={(e) => setJobFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {jobOptions.map((job) => (
                <option key={job} value={job}>
                  {job === "all" ? "All Jobs" : job}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center text-sm text-gray-600">
            <FiFilter className="mr-2" />
            {filteredApplicants.length} of {applicants.length} applicants
          </div>
        </div>
      </div>

      {/* Applicants Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredApplicants.map((applicant) => (
          <div
            key={applicant.id}
            className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow"
          >
            <div className="p-6">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="h-12 w-12 rounded-full bg-blue-500 flex items-center justify-center">
                    <span className="text-white font-medium">
                      {applicant.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {applicant.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {applicant.jobTitle}
                    </p>
                  </div>
                </div>
                <div className="relative">
                  <button
                    onClick={() => toggleDropdown(applicant.id)}
                    className="text-gray-400 hover:text-gray-600 p-1"
                  >
                    <FiMoreVertical className="w-5 h-5" />
                  </button>

                  {showDropdown === applicant.id && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                      <div className="py-1">
                        <button
                          onClick={() => setSelectedApplicant(applicant)}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <FiEye className="inline mr-2" />
                          View Details
                        </button>
                        <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                          <FiMail className="inline mr-2" />
                          Send Email
                        </button>
                        <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                          <FiMessageSquare className="inline mr-2" />
                          Add Note
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Status and Rating */}
              <div className="flex items-center justify-between mb-4">
                <span
                  className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                    applicant.status
                  )}`}
                >
                  {getStatusIcon(applicant.status)}
                  <span className="ml-1">{applicant.status}</span>
                </span>
                <div className="flex items-center space-x-1">
                  {getRatingStars(applicant.rating)}
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <FiMail className="w-4 h-4 mr-2" />
                  {applicant.email}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <FiPhone className="w-4 h-4 mr-2" />
                  {applicant.phone}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <FiMapPin className="w-4 h-4 mr-2" />
                  {applicant.location}
                </div>
              </div>

              {/* Skills */}
              <div className="mb-4">
                <div className="flex flex-wrap gap-1">
                  {applicant.skills.slice(0, 3).map((skill, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                  {applicant.skills.length > 3 && (
                    <span className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full">
                      +{applicant.skills.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              {/* Experience and Education */}
              <div className="text-sm text-gray-600 mb-4">
                <div className="flex items-center mb-1">
                  <FiBriefcase className="w-4 h-4 mr-2" />
                  {applicant.experience} experience
                </div>
                <div>{applicant.education}</div>
              </div>

              {/* Applied Date */}
              <div className="text-xs text-gray-500 mb-4">
                Applied {new Date(applicant.appliedDate).toLocaleDateString()}
              </div>

              {/* Actions */}
              <div className="flex space-x-2">
                <button
                  onClick={() => setSelectedApplicant(applicant)}
                  className="flex-1 px-3 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 flex items-center justify-center"
                >
                  <FiEye className="mr-2" />
                  View
                </button>
                <button className="px-3 py-2 border border-gray-300 text-sm rounded-md hover:bg-gray-50 flex items-center justify-center">
                  <FiDownload className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredApplicants.length === 0 && (
        <div className="text-center py-12">
          <FiUsers className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            No applicants found
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Try adjusting your search or filters.
          </p>
        </div>
      )}

      {/* Applicant Detail Modal */}
      {selectedApplicant && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Applicant Details
                </h2>
                <button
                  onClick={() => setSelectedApplicant(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <FiXCircle className="w-6 h-6" />
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - Basic Info */}
                <div className="lg:col-span-1">
                  <div className="text-center mb-6">
                    <div className="h-20 w-20 rounded-full bg-blue-500 flex items-center justify-center mx-auto mb-4">
                      <span className="text-white text-2xl font-medium">
                        {selectedApplicant.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {selectedApplicant.name}
                    </h3>
                    <p className="text-gray-500">
                      {selectedApplicant.jobTitle}
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">
                        Contact Information
                      </h4>
                      <div className="space-y-2">
                        <div className="flex items-center text-sm text-gray-600">
                          <FiMail className="w-4 h-4 mr-2" />
                          {selectedApplicant.email}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <FiPhone className="w-4 h-4 mr-2" />
                          {selectedApplicant.phone}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <FiMapPin className="w-4 h-4 mr-2" />
                          {selectedApplicant.location}
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">
                        Experience & Education
                      </h4>
                      <div className="space-y-2">
                        <div className="flex items-center text-sm text-gray-600">
                          <FiBriefcase className="w-4 h-4 mr-2" />
                          {selectedApplicant.experience}
                        </div>
                        <div className="text-sm text-gray-600">
                          {selectedApplicant.education}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column - Details */}
                <div className="lg:col-span-2">
                  <div className="mb-6">
                    <h4 className="font-medium text-gray-900 mb-2">Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedApplicant.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-medium text-gray-900 mb-2">
                      Cover Letter
                    </h4>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {selectedApplicant.coverLetter}
                    </p>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-medium text-gray-900 mb-2">
                      Interview Schedule
                    </h4>
                    <div className="space-y-2">
                      {selectedApplicant.interviews.map((interview, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-md"
                        >
                          <div>
                            <div className="font-medium text-gray-900">
                              {interview.type}
                            </div>
                            <div className="text-sm text-gray-500">
                              {new Date(interview.date).toLocaleDateString()}
                            </div>
                          </div>
                          <span
                            className={`px-2 py-1 text-xs font-medium rounded-full ${
                              interview.status === "completed"
                                ? "bg-green-100 text-green-800"
                                : "bg-blue-100 text-blue-800"
                            }`}
                          >
                            {interview.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-medium text-gray-900 mb-2">Notes</h4>
                    <p className="text-gray-600 text-sm">
                      {selectedApplicant.notes}
                    </p>
                  </div>

                  <div className="flex space-x-3">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                      Schedule Interview
                    </button>
                    <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50">
                      Send Email
                    </button>
                    <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50">
                      Download Resume
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApplicantTracking;

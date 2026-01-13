import React, { useState } from "react";
import {
  FiCalendar,
  FiClock,
  FiMapPin,
  FiUser,
  FiMail,
  FiPhone,
  FiVideo,
  FiMessageSquare,
  FiPlus,
  FiEdit2,
  FiX,
  FiCheck,
  FiAlertCircle,
} from "react-icons/fi";

const InterviewManagement = () => {
  const [interviews, setInterviews] = useState([
    {
      id: 1,
      applicantName: "John Doe",
      applicantEmail: "john.doe@email.com",
      jobTitle: "Senior React Developer",
      company: "Tech Corp",
      type: "Technical Interview",
      date: "2024-01-18",
      time: "2:00 PM",
      duration: "60 minutes",
      location: "Video Call - Zoom",
      status: "scheduled",
      interviewer: "Sarah Johnson",
      notes: "Focus on React hooks and state management",
      reminderSent: true,
    },
    {
      id: 2,
      applicantName: "Jane Smith",
      applicantEmail: "jane.smith@email.com",
      jobTitle: "Frontend Developer",
      company: "Tech Corp",
      type: "Final Interview",
      date: "2024-01-20",
      time: "10:00 AM",
      duration: "90 minutes",
      location: "Office - Conference Room A",
      status: "scheduled",
      interviewer: "Mike Chen",
      notes: "Cultural fit and team collaboration assessment",
      reminderSent: true,
    },
    {
      id: 3,
      applicantName: "Bob Wilson",
      applicantEmail: "bob.wilson@email.com",
      jobTitle: "UI/UX Designer",
      company: "Tech Corp",
      type: "Portfolio Review",
      date: "2024-01-16",
      time: "3:30 PM",
      duration: "45 minutes",
      location: "Video Call - Google Meet",
      status: "completed",
      interviewer: "Emily Davis",
      notes: "Strong portfolio, good design thinking",
      reminderSent: true,
      feedback:
        "Excellent presentation, very creative approach to problem-solving. Recommended for next round.",
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingInterview, setEditingInterview] = useState(null);
  const [formData, setFormData] = useState({
    applicantName: "",
    applicantEmail: "",
    jobTitle: "",
    type: "Phone Screen",
    date: "",
    time: "",
    duration: "30 minutes",
    location: "",
    interviewer: "",
    notes: "",
  });

  const interviewTypes = [
    "Phone Screen",
    "Technical Interview",
    "Behavioral Interview",
    "Portfolio Review",
    "Final Interview",
    "Group Interview",
  ];

  const durations = [
    "30 minutes",
    "45 minutes",
    "60 minutes",
    "90 minutes",
    "2 hours",
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "scheduled":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      case "rescheduled":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeIcon = (type) => {
    if (type.includes("Video") || type.includes("Call")) {
      return <FiVideo className="w-4 h-4" />;
    }
    return <FiUser className="w-4 h-4" />;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingInterview) {
      setInterviews(
        interviews.map((interview) =>
          interview.id === editingInterview.id
            ? { ...interview, ...formData }
            : interview
        )
      );
    } else {
      const newInterview = {
        id: Date.now(),
        ...formData,
        company: "Tech Corp",
        status: "scheduled",
        reminderSent: false,
      };
      setInterviews([...interviews, newInterview]);
    }

    setShowModal(false);
    setEditingInterview(null);
    setFormData({
      applicantName: "",
      applicantEmail: "",
      jobTitle: "",
      type: "Phone Screen",
      date: "",
      time: "",
      duration: "30 minutes",
      location: "",
      interviewer: "",
      notes: "",
    });
  };

  const handleEdit = (interview) => {
    setEditingInterview(interview);
    setFormData({
      applicantName: interview.applicantName,
      applicantEmail: interview.applicantEmail,
      jobTitle: interview.jobTitle,
      type: interview.type,
      date: interview.date,
      time: interview.time,
      duration: interview.duration,
      location: interview.location,
      interviewer: interview.interviewer,
      notes: interview.notes,
    });
    setShowModal(true);
  };

  const handleStatusChange = (interviewId, newStatus) => {
    setInterviews(
      interviews.map((interview) =>
        interview.id === interviewId
          ? { ...interview, status: newStatus }
          : interview
      )
    );
  };

  const handleDelete = (interviewId) => {
    if (window.confirm("Are you sure you want to cancel this interview?")) {
      handleStatusChange(interviewId, "cancelled");
    }
  };

  const upcomingInterviews = interviews.filter(
    (interview) => interview.status === "scheduled"
  );
  const completedInterviews = interviews.filter(
    (interview) => interview.status === "completed"
  );

  return (
    <div className="p-6">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Interview Management
            </h1>
            <p className="text-gray-600 mt-2">
              Schedule and manage candidate interviews.
            </p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
          >
            <FiPlus className="mr-2" />
            Schedule Interview
          </button>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="bg-blue-500 rounded-lg p-3 mr-4">
              <FiCalendar className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Scheduled</p>
              <p className="text-2xl font-bold text-gray-900">
                {upcomingInterviews.length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="bg-green-500 rounded-lg p-3 mr-4">
              <FiCheck className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-gray-900">
                {completedInterviews.length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="bg-purple-500 rounded-lg p-3 mr-4">
              <FiClock className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">This Week</p>
              <p className="text-2xl font-bold text-gray-900">
                {
                  interviews.filter((i) => {
                    const interviewDate = new Date(i.date);
                    const today = new Date();
                    const weekFromNow = new Date(
                      today.getTime() + 7 * 24 * 60 * 60 * 1000
                    );
                    return (
                      interviewDate >= today && interviewDate <= weekFromNow
                    );
                  }).length
                }
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="bg-orange-500 rounded-lg p-3 mr-4">
              <FiAlertCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-gray-900">
                {interviews.filter((i) => !i.reminderSent).length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming Interviews */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Upcoming Interviews
        </h2>
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {upcomingInterviews.length > 0 ? (
            <div className="divide-y divide-gray-200">
              {upcomingInterviews.map((interview) => (
                <div key={interview.id} className="p-6 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-4">
                        <div className="h-12 w-12 rounded-full bg-blue-500 flex items-center justify-center">
                          <span className="text-white font-medium">
                            {interview.applicantName
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </span>
                        </div>
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">
                            {interview.applicantName}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {interview.jobTitle}
                          </p>
                        </div>
                      </div>

                      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="flex items-center text-sm text-gray-600">
                          <FiCalendar className="w-4 h-4 mr-2" />
                          {new Date(
                            interview.date
                          ).toLocaleDateString()} at {interview.time}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <FiClock className="w-4 h-4 mr-2" />
                          {interview.duration}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          {interview.location.includes("Video") ||
                          interview.location.includes("Call") ? (
                            <FiVideo className="w-4 h-4 mr-2" />
                          ) : (
                            <FiMapPin className="w-4 h-4 mr-2" />
                          )}
                          {interview.location}
                        </div>
                      </div>

                      {interview.notes && (
                        <div className="mt-3 p-3 bg-yellow-50 rounded-md">
                          <p className="text-sm text-yellow-800">
                            <FiMessageSquare className="inline mr-2" />
                            {interview.notes}
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center space-x-2 ml-4">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                          interview.status
                        )}`}
                      >
                        {interview.status}
                      </span>
                      <button
                        onClick={() => handleEdit(interview)}
                        className="p-2 text-gray-400 hover:text-gray-600"
                      >
                        <FiEdit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(interview.id)}
                        className="p-2 text-gray-400 hover:text-red-600"
                      >
                        <FiX className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <FiCalendar className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                No upcoming interviews
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Schedule your first interview to get started.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Completed Interviews */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Completed Interviews
        </h2>
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {completedInterviews.length > 0 ? (
            <div className="divide-y divide-gray-200">
              {completedInterviews.map((interview) => (
                <div key={interview.id} className="p-6 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-4">
                        <div className="h-12 w-12 rounded-full bg-green-500 flex items-center justify-center">
                          <span className="text-white font-medium">
                            {interview.applicantName
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </span>
                        </div>
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">
                            {interview.applicantName}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {interview.jobTitle}
                          </p>
                        </div>
                      </div>

                      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="flex items-center text-sm text-gray-600">
                          <FiCalendar className="w-4 h-4 mr-2" />
                          {new Date(interview.date).toLocaleDateString()}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <FiUser className="w-4 h-4 mr-2" />
                          Interviewer: {interview.interviewer}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          {getTypeIcon(interview.type)}
                          <span className="ml-2">{interview.type}</span>
                        </div>
                      </div>

                      {interview.feedback && (
                        <div className="mt-3 p-3 bg-green-50 rounded-md">
                          <p className="text-sm text-green-800">
                            <FiMessageSquare className="inline mr-2" />
                            <strong>Feedback:</strong> {interview.feedback}
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center space-x-2 ml-4">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                          interview.status
                        )}`}
                      >
                        {interview.status}
                      </span>
                      <button className="p-2 text-gray-400 hover:text-gray-600">
                        <FiEdit2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <FiCheck className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                No completed interviews
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Completed interviews will appear here.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Schedule Interview Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  {editingInterview ? "Edit Interview" : "Schedule Interview"}
                </h2>
                <button
                  onClick={() => {
                    setShowModal(false);
                    setEditingInterview(null);
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <FiX className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Applicant Name *
                    </label>
                    <input
                      type="text"
                      name="applicantName"
                      value={formData.applicantName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Applicant Email *
                    </label>
                    <input
                      type="email"
                      name="applicantEmail"
                      value={formData.applicantEmail}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Job Title *
                    </label>
                    <input
                      type="text"
                      name="jobTitle"
                      value={formData.jobTitle}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Interview Type *
                    </label>
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {interviewTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date *
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Time *
                    </label>
                    <input
                      type="time"
                      name="time"
                      value={formData.time}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Duration *
                    </label>
                    <select
                      name="duration"
                      value={formData.duration}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {durations.map((duration) => (
                        <option key={duration} value={duration}>
                          {duration}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Interviewer *
                    </label>
                    <input
                      type="text"
                      name="interviewer"
                      value={formData.interviewer}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Location *
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g. Video Call - Zoom, Office - Conference Room A"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Notes
                    </label>
                    <textarea
                      name="notes"
                      value={formData.notes}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Any additional notes for the interviewer..."
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    type="button"
                    onClick={() => {
                      setShowModal(false);
                      setEditingInterview(null);
                    }}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    {editingInterview
                      ? "Update Interview"
                      : "Schedule Interview"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InterviewManagement;

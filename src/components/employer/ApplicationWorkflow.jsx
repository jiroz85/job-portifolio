import React, { useState } from "react";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiCalendar,
  FiMapPin,
  FiBriefcase,
  FiFileText,
  FiDownload,
  FiMessageSquare,
  FiEye,
  FiStar,
  FiCheckCircle,
  FiXCircle,
  FiClock,
  FiSend,
  FiEdit,
  FiAlertCircle,
} from "react-icons/fi";

const ApplicationWorkflow = ({
  applicant,
  onUpdateStatus,
  onSendMessage,
  onScheduleInterview,
}) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [showMessageForm, setShowMessageForm] = useState(false);
  const [showInterviewForm, setShowInterviewForm] = useState(false);
  const [message, setMessage] = useState("");
  const [interviewData, setInterviewData] = useState({
    type: "Phone Screening",
    date: "",
    time: "",
    location: "",
    notes: "",
  });

  const statusFlow = [
    {
      status: "pending",
      label: "Applied",
      icon: FiClock,
      color: "bg-gray-100 text-gray-800",
    },
    {
      status: "under_review",
      label: "Under Review",
      icon: FiEye,
      color: "bg-blue-100 text-blue-800",
    },
    {
      status: "shortlisted",
      label: "Shortlisted",
      icon: FiStar,
      color: "bg-indigo-100 text-indigo-800",
    },
    {
      status: "interview_scheduled",
      label: "Interview Scheduled",
      icon: FiCalendar,
      color: "bg-purple-100 text-purple-800",
    },
    {
      status: "interviewed",
      label: "Interviewed",
      icon: FiUser,
      color: "bg-orange-100 text-orange-800",
    },
    {
      status: "offered",
      label: "Offered",
      icon: FiCheckCircle,
      color: "bg-green-100 text-green-800",
    },
    {
      status: "accepted",
      label: "Hired",
      icon: FiCheckCircle,
      color: "bg-emerald-100 text-emerald-800",
    },
    {
      status: "rejected",
      label: "Rejected",
      icon: FiXCircle,
      color: "bg-red-100 text-red-800",
    },
  ];

  const getCurrentStatusIndex = () => {
    return statusFlow.findIndex((step) => step.status === applicant.status);
  };

  const canMoveToStatus = (targetStatus) => {
    const currentIndex = getCurrentStatusIndex();
    const targetIndex = statusFlow.findIndex(
      (step) => step.status === targetStatus
    );
    return targetIndex > currentIndex && targetStatus !== "rejected";
  };

  const handleStatusUpdate = async (newStatus) => {
    await onUpdateStatus(applicant.id, newStatus);
  };

  const handleSendMessage = async () => {
    if (message.trim()) {
      await onSendMessage(applicant.id, message);
      setMessage("");
      setShowMessageForm(false);
    }
  };

  const handleScheduleInterview = async () => {
    if (interviewData.date && interviewData.time) {
      await onScheduleInterview(applicant.id, interviewData);
      setInterviewData({
        type: "Phone Screening",
        date: "",
        time: "",
        location: "",
        notes: "",
      });
      setShowInterviewForm(false);
      await handleStatusUpdate("interview_scheduled");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <div className="h-16 w-16 rounded-full bg-blue-500 flex items-center justify-center">
            <span className="text-white text-xl font-bold">
              {applicant.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </span>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {applicant.name}
            </h2>
            <p className="text-gray-600">
              {applicant.jobTitle} at {applicant.company}
            </p>
            <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  statusFlow.find((s) => s.status === applicant.status)
                    ?.color || "bg-gray-100 text-gray-800"
                }`}
              >
                {applicant.status.replace("_", " ").toUpperCase()}
              </span>
              <span>
                Applied {new Date(applicant.appliedDate).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="flex space-x-8">
          {["overview", "timeline", "communication", "interviews"].map(
            (tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-2 px-1 border-b-2 font-medium text-sm capitalize ${
                  activeTab === tab
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab}
              </button>
            )
          )}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Contact Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3">
                <FiMail className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{applicant.email}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <FiPhone className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-medium">{applicant.phone}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <FiMapPin className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="font-medium">{applicant.location}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <FiBriefcase className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Experience</p>
                  <p className="font-medium">{applicant.experience}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Skills */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {applicant.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Cover Letter */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Cover Letter
            </h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700 leading-relaxed">
                {applicant.coverLetter}
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Quick Actions
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                onClick={() => setShowMessageForm(true)}
                className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                <FiMail className="mr-2" />
                Send Message
              </button>
              <button
                onClick={() => setShowInterviewForm(true)}
                className="flex items-center justify-center px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
              >
                <FiCalendar className="mr-2" />
                Schedule Interview
              </button>
              <button className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
                <FiDownload className="mr-2" />
                Download Resume
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === "timeline" && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Application Timeline
          </h3>
          <div className="space-y-4">
            {statusFlow.map((step, index) => {
              const isCompleted = index <= getCurrentStatusIndex();
              const isCurrent = step.status === applicant.status;
              const canMove = canMoveToStatus(step.status);

              return (
                <div key={step.status} className="flex items-center space-x-4">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      isCompleted
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-400"
                    }`}
                  >
                    <step.icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4
                        className={`font-medium ${
                          isCurrent ? "text-blue-600" : "text-gray-900"
                        }`}
                      >
                        {step.label}
                      </h4>
                      {canMove && (
                        <button
                          onClick={() => handleStatusUpdate(step.status)}
                          className="px-3 py-1 bg-blue-100 text-blue-700 rounded-md text-sm hover:bg-blue-200"
                        >
                          Move to {step.label}
                        </button>
                      )}
                    </div>
                    {isCurrent && (
                      <p className="text-sm text-gray-500 mt-1">
                        Current status
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {activeTab === "communication" && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Communication History
          </h3>
          <div className="space-y-4">
            {/* Placeholder for communication history */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-500 text-center">
                No communication history yet
              </p>
            </div>

            <button
              onClick={() => setShowMessageForm(true)}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center justify-center"
            >
              <FiSend className="mr-2" />
              Send New Message
            </button>
          </div>
        </div>
      )}

      {activeTab === "interviews" && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Interview Schedule
          </h3>
          <div className="space-y-4">
            {applicant.interviews && applicant.interviews.length > 0 ? (
              applicant.interviews.map((interview, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg p-4"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">
                        {interview.type}
                      </h4>
                      <p className="text-sm text-gray-500">
                        {new Date(interview.date).toLocaleDateString()} at{" "}
                        {interview.time}
                      </p>
                      <p className="text-sm text-gray-500">
                        {interview.location}
                      </p>
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
                </div>
              ))
            ) : (
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-500 text-center">
                  No interviews scheduled yet
                </p>
              </div>
            )}

            <button
              onClick={() => setShowInterviewForm(true)}
              className="w-full px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 flex items-center justify-center"
            >
              <FiCalendar className="mr-2" />
              Schedule Interview
            </button>
          </div>
        </div>
      )}

      {/* Message Modal */}
      {showMessageForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">
              Send Message to {applicant.name}
            </h3>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              rows="4"
              placeholder="Type your message here..."
            />
            <div className="flex justify-end space-x-3 mt-4">
              <button
                onClick={() => setShowMessageForm(false)}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSendMessage}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                <FiSend className="mr-2" />
                Send
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Interview Modal */}
      {showInterviewForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">
              Schedule Interview with {applicant.name}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Interview Type
                </label>
                <select
                  value={interviewData.type}
                  onChange={(e) =>
                    setInterviewData((prev) => ({
                      ...prev,
                      type: e.target.value,
                    }))
                  }
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                >
                  <option>Phone Screening</option>
                  <option>Video Interview</option>
                  <option>Technical Interview</option>
                  <option>On-site Interview</option>
                  <option>Final Interview</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date
                  </label>
                  <input
                    type="date"
                    value={interviewData.date}
                    onChange={(e) =>
                      setInterviewData((prev) => ({
                        ...prev,
                        date: e.target.value,
                      }))
                    }
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Time
                  </label>
                  <input
                    type="time"
                    value={interviewData.time}
                    onChange={(e) =>
                      setInterviewData((prev) => ({
                        ...prev,
                        time: e.target.value,
                      }))
                    }
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location/Method
                </label>
                <input
                  type="text"
                  value={interviewData.location}
                  onChange={(e) =>
                    setInterviewData((prev) => ({
                      ...prev,
                      location: e.target.value,
                    }))
                  }
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Phone call, Video link, Office address..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Notes
                </label>
                <textarea
                  value={interviewData.notes}
                  onChange={(e) =>
                    setInterviewData((prev) => ({
                      ...prev,
                      notes: e.target.value,
                    }))
                  }
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  rows="3"
                  placeholder="Additional details..."
                />
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowInterviewForm(false)}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleScheduleInterview}
                className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
              >
                <FiCalendar className="mr-2" />
                Schedule
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApplicationWorkflow;

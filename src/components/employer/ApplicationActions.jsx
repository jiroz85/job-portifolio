import React, { useState } from "react";
import {
  FiEye,
  FiMail,
  FiCalendar,
  FiMessageSquare,
  FiDownload,
  FiStar,
  FiXCircle,
  FiCheckCircle,
  FiClock,
  FiUser,
  FiFileText,
  FiPhone,
  FiSend,
  FiMoreVertical,
} from "react-icons/fi";

const ApplicationActions = ({
  applicant,
  onStatusChange,
  onScheduleInterview,
  onSendMessage,
}) => {
  const [showActionMenu, setShowActionMenu] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [showInterviewModal, setShowInterviewModal] = useState(false);
  const [message, setMessage] = useState("");
  const [interviewDetails, setInterviewDetails] = useState({
    type: "Phone Screening",
    date: "",
    time: "",
    location: "Phone Call",
    notes: "",
  });

  const handleStatusUpdate = async (newStatus, buttonElement) => {
    try {
      // Show loading state
      if (buttonElement) {
        const originalText = buttonElement.textContent;
        buttonElement.textContent = "Updating...";
        buttonElement.disabled = true;

        // Restore after completion
        setTimeout(() => {
          buttonElement.textContent = originalText;
          buttonElement.disabled = false;
        }, 1000);
      }

      await onStatusChange(applicant.id, newStatus);
      setShowActionMenu(false);

      // Show success feedback
      console.log(`Application status updated to: ${newStatus}`);
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  const handleSendMessage = async () => {
    if (message.trim()) {
      await onSendMessage(applicant.id, message);
      setMessage("");
      setShowMessageModal(false);
      setShowActionMenu(false);
    }
  };

  const handleScheduleInterview = async () => {
    if (interviewDetails.date && interviewDetails.time) {
      await onScheduleInterview(applicant.id, interviewDetails);
      setInterviewDetails({
        type: "Phone Screening",
        date: "",
        time: "",
        location: "Phone Call",
        notes: "",
      });
      setShowInterviewModal(false);
      setShowActionMenu(false);
    }
  };

  return (
    <div className="relative">
      {/* Main Action Button */}
      <button
        onClick={() => setShowActionMenu(!showActionMenu)}
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
      >
        <FiMoreVertical className="mr-2" />
        Actions
      </button>

      {/* Action Menu */}
      {showActionMenu && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          <div className="p-2">
            {/* Quick Actions */}
            <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Quick Actions
            </div>

            <button
              onClick={() => {
                setShowMessageModal(true);
              }}
              className="w-full text-left px-3 py-2 text-sm hover:bg-blue-50 rounded flex items-center text-blue-600 hover:text-blue-800"
            >
              <FiMail className="mr-2" />
              Send Message
            </button>

            <button
              onClick={() => setShowInterviewModal(true)}
              className="w-full text-left px-3 py-2 text-sm hover:bg-green-50 rounded flex items-center text-green-600 hover:text-green-800"
            >
              <FiCalendar className="mr-2" />
              Schedule Interview
            </button>

            <button className="w-full text-left px-3 py-2 text-sm hover:bg-purple-50 rounded flex items-center text-purple-600 hover:text-purple-800">
              <FiDownload className="mr-2" />
              Download Resume
            </button>

            <button className="w-full text-left px-3 py-2 text-sm hover:bg-yellow-50 rounded flex items-center text-yellow-600 hover:text-yellow-800">
              <FiMessageSquare className="mr-2" />
              Add Note
            </button>

            {/* Status Updates */}
            <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider mt-3">
              Update Status
            </div>

            <button
              onClick={() => handleStatusUpdate("under_review")}
              className="w-full text-left px-3 py-2 text-sm hover:bg-orange-50 rounded flex items-center text-orange-600 hover:text-orange-800"
            >
              <FiEye className="mr-2" />
              Mark as Under Review
            </button>

            <button
              onClick={() => handleStatusUpdate("shortlisted")}
              className="w-full text-left px-3 py-2 text-sm hover:bg-indigo-50 rounded flex items-center text-indigo-600 hover:text-indigo-800"
            >
              <FiStar className="mr-2" />
              Shortlist
            </button>

            <button
              onClick={() => handleStatusUpdate("interview_scheduled")}
              className="w-full text-left px-3 py-2 text-sm hover:bg-teal-50 rounded flex items-center text-teal-600 hover:text-teal-800"
            >
              <FiCalendar className="mr-2" />
              Schedule Interview
            </button>

            <button
              onClick={() => handleStatusUpdate("offered")}
              className="w-full text-left px-3 py-2 text-sm hover:bg-emerald-50 rounded flex items-center text-emerald-600 hover:text-emerald-800"
            >
              <FiCheckCircle className="mr-2" />
              Offer Job
            </button>

            <button
              onClick={() => handleStatusUpdate("rejected")}
              className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded flex items-center hover:text-red-800"
            >
              <FiXCircle className="mr-2" />
              Reject
            </button>
          </div>
        </div>
      )}

      {/* Message Modal */}
      {showMessageModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">
              Send Message to {applicant.name}
            </h3>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Message
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                rows="4"
                placeholder="Type your message here..."
              />
            </div>

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowMessageModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSendMessage}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
              >
                <FiSend className="mr-2" />
                Send Message
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Interview Modal */}
      {showInterviewModal && (
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
                  value={interviewDetails.type}
                  onChange={(e) =>
                    setInterviewDetails((prev) => ({
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
                    value={interviewDetails.date}
                    onChange={(e) =>
                      setInterviewDetails((prev) => ({
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
                    value={interviewDetails.time}
                    onChange={(e) =>
                      setInterviewDetails((prev) => ({
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
                  value={interviewDetails.location}
                  onChange={(e) =>
                    setInterviewDetails((prev) => ({
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
                  Notes (Optional)
                </label>
                <textarea
                  value={interviewDetails.notes}
                  onChange={(e) =>
                    setInterviewDetails((prev) => ({
                      ...prev,
                      notes: e.target.value,
                    }))
                  }
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  rows="3"
                  placeholder="Any additional details for the interview..."
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowInterviewModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleScheduleInterview}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
              >
                <FiCalendar className="mr-2" />
                Schedule Interview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApplicationActions;

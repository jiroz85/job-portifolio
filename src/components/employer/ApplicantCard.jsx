import React from "react";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiBriefcase,
  FiEye,
  FiDownload,
  FiMoreVertical,
  FiClock,
  FiStar,
  FiCalendar,
  FiCheckCircle,
  FiXCircle,
} from "react-icons/fi";
import ApplicationActions from "./ApplicationActions";

const ApplicantCard = ({
  applicant,
  onStatusChange,
  onSendMessage,
  onScheduleInterview,
  onViewDetails,
}) => {
  const getStatusColor = (status) => {
    const colors = {
      pending: "bg-gray-100 text-gray-800",
      under_review: "bg-blue-100 text-blue-800",
      shortlisted: "bg-indigo-100 text-indigo-800",
      interview_scheduled: "bg-purple-100 text-purple-800",
      interviewed: "bg-orange-100 text-orange-800",
      offered: "bg-green-100 text-green-800",
      accepted: "bg-emerald-100 text-emerald-800",
      rejected: "bg-red-100 text-red-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  const getStatusIcon = (status) => {
    const icons = {
      pending: <FiClock className="w-4 h-4" />,
      under_review: <FiEye className="w-4 h-4" />,
      shortlisted: <FiStar className="w-4 h-4" />,
      interview_scheduled: <FiCalendar className="w-4 h-4" />,
      interviewed: <FiUser className="w-4 h-4" />,
      offered: <FiCheckCircle className="w-4 h-4" />,
      accepted: <FiCheckCircle className="w-4 h-4" />,
      rejected: <FiXCircle className="w-4 h-4" />,
    };
    return icons[status] || <FiClock className="w-4 h-4" />;
  };

  return (
    <div className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
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
              <h3 className="font-semibold text-gray-900">{applicant.name}</h3>
              <p className="text-sm text-gray-500">
                {applicant.experience} experience
              </p>
            </div>
          </div>

          {/* Status Badge */}
          <div className="flex items-center space-x-2">
            <span
              className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                applicant.status
              )}`}
            >
              {getStatusIcon(applicant.status)}
              <span className="ml-1">{applicant.status}</span>
            </span>
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

        {/* Applied Date */}
        <div className="text-xs text-gray-500 mb-4">
          Applied {new Date(applicant.appliedDate).toLocaleDateString()}
        </div>

        {/* Actions */}
        <div className="flex space-x-2">
          <button
            onClick={() => onViewDetails(applicant)}
            className="flex-1 px-3 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 flex items-center justify-center"
          >
            <FiEye className="mr-2" />
            View Details
          </button>

          <ApplicationActions
            applicant={applicant}
            onStatusChange={onStatusChange}
            onSendMessage={onSendMessage}
            onScheduleInterview={onScheduleInterview}
          />

          <button className="px-3 py-2 border border-gray-300 text-sm rounded-md hover:bg-gray-50 flex items-center justify-center">
            <FiDownload className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApplicantCard;

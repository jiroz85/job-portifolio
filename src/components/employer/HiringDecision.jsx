import React from "react";
import { FiCheckCircle, FiXCircle } from "react-icons/fi";

const HiringDecision = ({ applicant, onStatusChange }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Application Status
      </h3>

      {/* Decision Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Accept Applicant Button */}
        <button
          onClick={() => onStatusChange(applicant.id, "accepted")}
          className="flex items-center justify-center px-6 py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          <FiCheckCircle className="mr-2" />
          <div className="text-left">
            <div className="font-semibold">Accepted</div>
            <div className="text-sm opacity-90">
              Mark application as accepted
            </div>
          </div>
        </button>

        {/* Reject Applicant Button */}
        <button
          onClick={() => onStatusChange(applicant.id, "rejected")}
          className="flex items-center justify-center px-6 py-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          <FiXCircle className="mr-2" />
          <div className="text-left">
            <div className="font-semibold">Rejected</div>
            <div className="text-sm opacity-90">
              Mark application as rejected
            </div>
          </div>
        </button>
      </div>
    </div>
  );
};

export default HiringDecision;

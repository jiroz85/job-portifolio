import React, { useState } from "react";
import {
  FiCheckCircle,
  FiXCircle,
  FiCalendar,
  FiMail,
  FiFileText,
  FiDollarSign,
  FiMapPin,
  FiBriefcase,
  FiUser,
  FiSend,
  FiAlertCircle,
} from "react-icons/fi";

const HiringDecision = ({ applicant, onStatusChange, onSendMessage }) => {
  const [showOfferModal, setShowOfferModal] = useState(false);
  const [showRejectionModal, setShowRejectionModal] = useState(false);
  const [offerDetails, setOfferDetails] = useState({
    salary: "",
    startDate: "",
    workType: "full-time",
    location: "",
    reportingTo: "",
    benefits: "",
    notes: "",
  });
  const [rejectionReason, setRejectionReason] = useState("");
  const [rejectionType, setRejectionType] = useState("position_filled");

  const handleOfferJob = async () => {
    try {
      // Validate required fields
      if (!offerDetails.salary || !offerDetails.startDate) {
        alert("Please fill in all required offer details");
        return;
      }

      // Update status to offered
      await onStatusChange(applicant.id, "offered");

      // Send offer details (in real implementation, this would email the offer)
      const offerMessage = `
        JOB OFFER - ${applicant.jobTitle}
        
        Salary: ${offerDetails.salary}
        Start Date: ${offerDetails.startDate}
        Work Type: ${offerDetails.workType}
        Location: ${offerDetails.location || "TBD"}
        Reporting to: ${offerDetails.reportingTo || "TBD"}
        
        Benefits: ${offerDetails.benefits || "Standard company benefits"}
        
        Notes: ${offerDetails.notes}
        
        Please respond within 5 business days.
      `;

      await onSendMessage(applicant.id, offerMessage);

      setShowOfferModal(false);
      alert(`🎉 Job offer sent to ${applicant.name}!`);
    } catch (error) {
      console.error("Error sending job offer:", error);
      alert("Failed to send job offer. Please try again.");
    }
  };

  const handleRejectApplicant = async () => {
    try {
      if (!rejectionReason.trim()) {
        alert("Please provide a reason for rejection");
        return;
      }

      // Update status to rejected
      await onStatusChange(applicant.id, "rejected");

      // Send rejection message
      const rejectionMessage = `
        Thank you for your interest in the ${applicant.jobTitle} position.
        
        After careful consideration, we have decided to move forward with other candidates whose qualifications more closely match our current needs.
        
        ${rejectionReason}
        
        We wish you the best in your job search and encourage you to apply for future positions that match your skills and experience.
      `;

      await onSendMessage(applicant.id, rejectionMessage);

      setShowRejectionModal(false);
      alert(`Rejection sent to ${applicant.name}`);
    } catch (error) {
      console.error("Error sending rejection:", error);
      alert("Failed to send rejection. Please try again.");
    }
  };

  const rejectionReasons = {
    position_filled: "The position has been filled.",
    experience_mismatch:
      "The candidate's experience doesn't match our requirements.",
    skills_mismatch:
      "The candidate's skills don't align with the position needs.",
    culture_fit: "We didn't find the right cultural fit at this time.",
    budget_constraints: "The position requirements exceed our current budget.",
    internal_candidate:
      "We have selected an internal candidate for this position.",
    other: "Other reason (please specify below)",
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Hiring Decision
      </h3>

      {/* Decision Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Offer Job Button */}
        <button
          onClick={() => setShowOfferModal(true)}
          className="flex items-center justify-center px-6 py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          <FiCheckCircle className="mr-2" />
          <div className="text-left">
            <div className="font-semibold">Offer Job</div>
            <div className="text-sm opacity-90">Send formal job offer</div>
          </div>
        </button>

        {/* Reject Applicant Button */}
        <button
          onClick={() => setShowRejectionModal(true)}
          className="flex items-center justify-center px-6 py-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          <FiXCircle className="mr-2" />
          <div className="text-left">
            <div className="font-semibold">Reject Applicant</div>
            <div className="text-sm opacity-90">Send rejection notice</div>
          </div>
        </button>
      </div>

      {/* Offer Job Modal */}
      {showOfferModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Send Job Offer to {applicant.name}
                </h2>
                <button
                  onClick={() => setShowOfferModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <FiXCircle className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-6">
                {/* Offer Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Salary Offer *
                    </label>
                    <div className="relative">
                      <FiDollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        value={offerDetails.salary}
                        onChange={(e) =>
                          setOfferDetails((prev) => ({
                            ...prev,
                            salary: e.target.value,
                          }))
                        }
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        placeholder="e.g., $80,000 - $95,000"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Start Date *
                    </label>
                    <input
                      type="date"
                      value={offerDetails.startDate}
                      onChange={(e) =>
                        setOfferDetails((prev) => ({
                          ...prev,
                          startDate: e.target.value,
                        }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Work Type
                    </label>
                    <select
                      value={offerDetails.workType}
                      onChange={(e) =>
                        setOfferDetails((prev) => ({
                          ...prev,
                          workType: e.target.value,
                        }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="full-time">Full-time</option>
                      <option value="part-time">Part-time</option>
                      <option value="contract">Contract</option>
                      <option value="internship">Internship</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Location
                    </label>
                    <div className="relative">
                      <FiMapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        value={offerDetails.location}
                        onChange={(e) =>
                          setOfferDetails((prev) => ({
                            ...prev,
                            location: e.target.value,
                          }))
                        }
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Office location or Remote"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Reporting To
                    </label>
                    <div className="relative">
                      <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        value={offerDetails.reportingTo}
                        onChange={(e) =>
                          setOfferDetails((prev) => ({
                            ...prev,
                            reportingTo: e.target.value,
                          }))
                        }
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Manager name/position"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Benefits
                    </label>
                    <textarea
                      value={offerDetails.benefits}
                      onChange={(e) =>
                        setOfferDetails((prev) => ({
                          ...prev,
                          benefits: e.target.value,
                        }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      rows="3"
                      placeholder="Health insurance, 401k, PTO, etc."
                    />
                  </div>
                </div>

                {/* Additional Notes */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Additional Notes
                  </label>
                  <textarea
                    value={offerDetails.notes}
                    onChange={(e) =>
                      setOfferDetails((prev) => ({
                        ...prev,
                        notes: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    rows="4"
                    placeholder="Any additional terms or conditions..."
                  />
                </div>

                {/* Actions */}
                <div className="flex justify-end space-x-4">
                  <button
                    onClick={() => setShowOfferModal(false)}
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleOfferJob}
                    className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center"
                  >
                    <FiSend className="mr-2" />
                    Send Job Offer
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Rejection Modal */}
      {showRejectionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-lg w-full">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">
                  Reject Application - {applicant.name}
                </h2>
                <button
                  onClick={() => setShowRejectionModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <FiXCircle className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-4">
                {/* Rejection Reason Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Rejection Reason
                  </label>
                  <select
                    value={rejectionType}
                    onChange={(e) => setRejectionType(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  >
                    {Object.entries(rejectionReasons).map(([key, value]) => (
                      <option key={key} value={key}>
                        {value}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Custom Rejection Message */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Additional Message (Optional)
                  </label>
                  <textarea
                    value={rejectionReason}
                    onChange={(e) => setRejectionReason(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    rows="4"
                    placeholder="Add any specific feedback or encouragement..."
                  />
                </div>

                {/* Warning */}
                <div className="flex items-start p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                  <FiAlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 mr-2" />
                  <p className="text-sm text-yellow-800">
                    This action will update the application status to "rejected"
                    and send a notification to the applicant. This cannot be
                    undone.
                  </p>
                </div>

                {/* Actions */}
                <div className="flex justify-end space-x-4">
                  <button
                    onClick={() => setShowRejectionModal(false)}
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleRejectApplicant}
                    className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                  >
                    Send Rejection
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HiringDecision;

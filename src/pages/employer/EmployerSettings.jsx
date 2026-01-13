import React, { useState } from "react";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiGlobe,
  FiLinkedin,
  FiBriefcase,
  FiSettings,
  FiBell,
  FiShield,
  FiCreditCard,
  FiSave,
  FiEye,
  FiEyeOff,
} from "react-icons/fi";

const EmployerSettings = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [showPassword, setShowPassword] = useState(false);
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    applicationAlerts: true,
    interviewReminders: true,
    weeklyReports: false,
    marketingEmails: false,
  });

  const [profileData, setProfileData] = useState({
    companyName: "Tech Corp",
    industry: "Technology",
    companySize: "100-500",
    website: "https://techcorp.com",
    description:
      "Leading technology company specializing in innovative software solutions.",
    foundedYear: "2015",
    headquarters: "San Francisco, CA",
    contactEmail: "hr@techcorp.com",
    contactPhone: "+1 (555) 123-4567",
    linkedin: "https://linkedin.com/company/techcorp",
    logo: "",
  });

  const [securityData, setSecurityData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    twoFactorAuth: false,
  });

  const tabs = [
    { id: "profile", name: "Company Profile", icon: FiBriefcase },
    { id: "notifications", name: "Notifications", icon: FiBell },
    { id: "security", name: "Security", icon: FiShield },
    { id: "billing", name: "Billing", icon: FiCreditCard },
  ];

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSecurityChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSecurityData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleNotificationChange = (key) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    console.log("Saving profile:", profileData);
    // Handle profile save
  };

  const handleSaveSecurity = (e) => {
    e.preventDefault();
    console.log("Saving security settings:", securityData);
    // Handle security settings save
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-2">
          Manage your company profile and account settings.
        </p>
      </div>

      <div className="bg-white rounded-lg shadow">
        {/* Tab Navigation */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center ${
                  activeTab === tab.id
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <tab.icon className="w-4 h-4 mr-2" />
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {/* Company Profile Tab */}
          {activeTab === "profile" && (
            <form onSubmit={handleSaveProfile}>
              <div className="max-w-4xl">
                <h2 className="text-lg font-semibold text-gray-900 mb-6">
                  Company Information
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company Name *
                    </label>
                    <input
                      type="text"
                      name="companyName"
                      value={profileData.companyName}
                      onChange={handleProfileChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Industry *
                    </label>
                    <select
                      name="industry"
                      value={profileData.industry}
                      onChange={handleProfileChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Technology">Technology</option>
                      <option value="Healthcare">Healthcare</option>
                      <option value="Finance">Finance</option>
                      <option value="Education">Education</option>
                      <option value="Retail">Retail</option>
                      <option value="Manufacturing">Manufacturing</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company Size
                    </label>
                    <select
                      name="companySize"
                      value={profileData.companySize}
                      onChange={handleProfileChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="1-10">1-10 employees</option>
                      <option value="11-50">11-50 employees</option>
                      <option value="51-200">51-200 employees</option>
                      <option value="201-500">201-500 employees</option>
                      <option value="501-1000">501-1000 employees</option>
                      <option value="1000+">1000+ employees</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Founded Year
                    </label>
                    <input
                      type="text"
                      name="foundedYear"
                      value={profileData.foundedYear}
                      onChange={handleProfileChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <FiGlobe className="inline mr-1" />
                      Website
                    </label>
                    <input
                      type="url"
                      name="website"
                      value={profileData.website}
                      onChange={handleProfileChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <FiMapPin className="inline mr-1" />
                      Headquarters
                    </label>
                    <input
                      type="text"
                      name="headquarters"
                      value={profileData.headquarters}
                      onChange={handleProfileChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <FiMail className="inline mr-1" />
                      Contact Email *
                    </label>
                    <input
                      type="email"
                      name="contactEmail"
                      value={profileData.contactEmail}
                      onChange={handleProfileChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <FiPhone className="inline mr-1" />
                      Contact Phone
                    </label>
                    <input
                      type="tel"
                      name="contactPhone"
                      value={profileData.contactPhone}
                      onChange={handleProfileChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <FiLinkedin className="inline mr-1" />
                      LinkedIn Profile
                    </label>
                    <input
                      type="url"
                      name="linkedin"
                      value={profileData.linkedin}
                      onChange={handleProfileChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Company Description
                  </label>
                  <textarea
                    name="description"
                    value={profileData.description}
                    onChange={handleProfileChange}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Describe your company culture, mission, and what makes it a great place to work..."
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
                  >
                    <FiSave className="mr-2" />
                    Save Changes
                  </button>
                </div>
              </div>
            </form>
          )}

          {/* Notifications Tab */}
          {activeTab === "notifications" && (
            <div className="max-w-4xl">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">
                Notification Preferences
              </h2>

              <div className="space-y-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-4">
                    Email Notifications
                  </h3>
                  <div className="space-y-3">
                    {Object.entries({
                      emailNotifications: "Receive email notifications",
                      applicationAlerts: "New application alerts",
                      interviewReminders: "Interview reminders",
                      weeklyReports: "Weekly performance reports",
                      marketingEmails: "Marketing and product updates",
                    }).map(([key, label]) => (
                      <label
                        key={key}
                        className="flex items-center justify-between"
                      >
                        <span className="text-sm text-gray-700">{label}</span>
                        <input
                          type="checkbox"
                          checked={notifications[key]}
                          onChange={() => handleNotificationChange(key)}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                      </label>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-4">
                    Alert Frequency
                  </h3>
                  <div className="space-y-3">
                    <label className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">
                        Application alerts
                      </span>
                      <select className="px-3 py-1 border border-gray-300 rounded-md text-sm">
                        <option>Immediate</option>
                        <option>Daily digest</option>
                        <option>Weekly digest</option>
                      </select>
                    </label>
                    <label className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">
                        Performance reports
                      </span>
                      <select className="px-3 py-1 border border-gray-300 rounded-md text-sm">
                        <option>Weekly</option>
                        <option>Monthly</option>
                        <option>Quarterly</option>
                      </select>
                    </label>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center">
                    <FiSave className="mr-2" />
                    Save Preferences
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === "security" && (
            <form onSubmit={handleSaveSecurity}>
              <div className="max-w-4xl">
                <h2 className="text-lg font-semibold text-gray-900 mb-6">
                  Security Settings
                </h2>

                <div className="space-y-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-medium text-gray-900 mb-4">
                      Change Password
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Current Password
                        </label>
                        <input
                          type="password"
                          name="currentPassword"
                          value={securityData.currentPassword}
                          onChange={handleSecurityChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          New Password
                        </label>
                        <div className="relative">
                          <input
                            type={showPassword ? "text" : "password"}
                            name="newPassword"
                            value={securityData.newPassword}
                            onChange={handleSecurityChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          >
                            {showPassword ? (
                              <FiEyeOff className="w-5 h-5" />
                            ) : (
                              <FiEye className="w-5 h-5" />
                            )}
                          </button>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Confirm New Password
                        </label>
                        <input
                          type="password"
                          name="confirmPassword"
                          value={securityData.confirmPassword}
                          onChange={handleSecurityChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-medium text-gray-900 mb-4">
                      Two-Factor Authentication
                    </h3>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-700">
                          Add an extra layer of security to your account
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          Requires authentication code when signing in
                        </p>
                      </div>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          name="twoFactorAuth"
                          checked={securityData.twoFactorAuth}
                          onChange={handleSecurityChange}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <span className="ml-2 text-sm text-gray-700">
                          Enable 2FA
                        </span>
                      </label>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
                    >
                      <FiSave className="mr-2" />
                      Update Security
                    </button>
                  </div>
                </div>
              </div>
            </form>
          )}

          {/* Billing Tab */}
          {activeTab === "billing" && (
            <div className="max-w-4xl">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">
                Billing & Subscription
              </h2>

              <div className="space-y-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-4">
                    Current Plan
                  </h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-lg font-medium text-gray-900">
                        Professional Plan
                      </h4>
                      <p className="text-sm text-gray-500">$299/month</p>
                      <p className="text-xs text-gray-400 mt-1">
                        Next billing date: February 15, 2024
                      </p>
                    </div>
                    <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50">
                      Change Plan
                    </button>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-4">
                    Payment Method
                  </h3>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-12 h-8 bg-blue-600 rounded flex items-center justify-center text-white text-xs font-medium">
                        VISA
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">
                          •••• •••• •••• 4242
                        </p>
                        <p className="text-xs text-gray-500">Expires 12/25</p>
                      </div>
                    </div>
                    <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50">
                      Update
                    </button>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-4">
                    Billing History
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between py-2 border-b border-gray-200">
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          Professional Plan - January 2024
                        </p>
                        <p className="text-xs text-gray-500">Jan 15, 2024</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">
                          $299.00
                        </p>
                        <button className="text-xs text-blue-600 hover:text-blue-800">
                          Download
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between py-2">
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          Professional Plan - December 2023
                        </p>
                        <p className="text-xs text-gray-500">Dec 15, 2023</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">
                          $299.00
                        </p>
                        <button className="text-xs text-blue-600 hover:text-blue-800">
                          Download
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployerSettings;

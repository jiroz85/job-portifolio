import React, { useState } from "react";
import {
  FiSettings,
  FiMail,
  FiLock,
  FiCreditCard,
  FiStar,
  FiBell,
  FiShield,
  FiDatabase,
  FiSave,
  FiEye,
  FiEyeOff,
  FiToggleLeft,
  FiToggleRight,
} from "react-icons/fi";

const SystemSettings = () => {
  const [activeTab, setActiveTab] = useState("general");
  const [settings, setSettings] = useState({
    general: {
      siteName: "Job Portal",
      siteDescription: "Find your dream job today",
      contactEmail: "admin@jobportal.com",
      maintenanceMode: false,
      allowRegistration: true,
      requireEmailVerification: true,
    },
    email: {
      smtpHost: "smtp.gmail.com",
      smtpPort: 587,
      smtpUser: "noreply@jobportal.com",
      smtpPassword: "••••••••••",
      emailFromName: "Job Portal Team",
      emailFromAddress: "noreply@jobportal.com",
      enableEmailNotifications: true,
    },
    security: {
      passwordMinLength: 8,
      passwordRequireUppercase: true,
      passwordRequireLowercase: true,
      passwordRequireNumbers: true,
      passwordRequireSpecialChars: true,
      sessionTimeout: 30,
      maxLoginAttempts: 5,
      enableTwoFactorAuth: false,
    },
    subscriptions: {
      freePlan: {
        name: "Free",
        price: 0,
        jobPostings: 5,
        featuredJobs: 0,
        resumeViews: 50,
        duration: "30 days",
      },
      basicPlan: {
        name: "Basic",
        price: 29,
        jobPostings: 25,
        featuredJobs: 2,
        resumeViews: 500,
        duration: "30 days",
      },
      premiumPlan: {
        name: "Premium",
        price: 79,
        jobPostings: 100,
        featuredJobs: 10,
        resumeViews: 2000,
        duration: "30 days",
      },
      enterprisePlan: {
        name: "Enterprise",
        price: 199,
        jobPostings: "Unlimited",
        featuredJobs: 25,
        resumeViews: "Unlimited",
        duration: "30 days",
      },
    },
    notifications: {
      emailNotifications: true,
      pushNotifications: true,
      smsNotifications: false,
      newJobAlerts: true,
      applicationUpdates: true,
      systemAlerts: true,
      marketingEmails: false,
    },
    featuredJobs: {
      enableFeaturedJobs: true,
      maxFeaturedJobs: 50,
      featuredJobPrice: 25,
      featuredDuration: 7,
      autoRenewFeatured: false,
    },
  });

  const [showPasswords, setShowPasswords] = useState({
    smtp: false,
  });

  const handleSettingChange = (category, field, value) => {
    setSettings((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: value,
      },
    }));
  };

  const handleSaveSettings = () => {
    // Mock save functionality
    console.log("Saving settings:", settings);
    alert("Settings saved successfully!");
    // In a real app, this would save to backend
  };

  const handleResetSettings = (category) => {
    if (
      window.confirm(
        `Are you sure you want to reset ${category} settings to default?`
      )
    ) {
      // Mock reset functionality
      console.log(`Resetting ${category} settings`);
      alert(`${category} settings reset to default!`);
    }
  };

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Site Name
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            value={settings.general.siteName}
            onChange={(e) =>
              handleSettingChange("general", "siteName", e.target.value)
            }
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Contact Email
          </label>
          <input
            type="email"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            value={settings.general.contactEmail}
            onChange={(e) =>
              handleSettingChange("general", "contactEmail", e.target.value)
            }
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Site Description
        </label>
        <textarea
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          value={settings.general.siteDescription}
          onChange={(e) =>
            handleSettingChange("general", "siteDescription", e.target.value)
          }
        />
      </div>

      <div className="space-y-4">
        <div className="flex items-center">
          <input
            type="checkbox"
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            checked={settings.general.maintenanceMode}
            onChange={(e) =>
              handleSettingChange(
                "general",
                "maintenanceMode",
                e.target.checked
              )
            }
          />
          <label className="ml-2 text-sm text-gray-700">Maintenance Mode</label>
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            checked={settings.general.allowRegistration}
            onChange={(e) =>
              handleSettingChange(
                "general",
                "allowRegistration",
                e.target.checked
              )
            }
          />
          <label className="ml-2 text-sm text-gray-700">
            Allow User Registration
          </label>
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            checked={settings.general.requireEmailVerification}
            onChange={(e) =>
              handleSettingChange(
                "general",
                "requireEmailVerification",
                e.target.checked
              )
            }
          />
          <label className="ml-2 text-sm text-gray-700">
            Require Email Verification
          </label>
        </div>
      </div>
    </div>
  );

  const renderEmailSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            SMTP Host
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            value={settings.email.smtpHost}
            onChange={(e) =>
              handleSettingChange("email", "smtpHost", e.target.value)
            }
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            SMTP Port
          </label>
          <input
            type="number"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            value={settings.email.smtpPort}
            onChange={(e) =>
              handleSettingChange("email", "smtpPort", e.target.value)
            }
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            SMTP Username
          </label>
          <input
            type="email"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            value={settings.email.smtpUser}
            onChange={(e) =>
              handleSettingChange("email", "smtpUser", e.target.value)
            }
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            SMTP Password
          </label>
          <div className="relative">
            <input
              type={showPasswords.smtp ? "text" : "password"}
              className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={settings.email.smtpPassword}
              onChange={(e) =>
                handleSettingChange("email", "smtpPassword", e.target.value)
              }
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 px-3 flex items-center"
              onClick={() =>
                setShowPasswords((prev) => ({ ...prev, smtp: !prev.smtp }))
              }
            >
              {showPasswords.smtp ? (
                <FiEyeOff className="h-4 w-4 text-gray-400" />
              ) : (
                <FiEye className="h-4 w-4 text-gray-400" />
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            From Name
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            value={settings.email.emailFromName}
            onChange={(e) =>
              handleSettingChange("email", "emailFromName", e.target.value)
            }
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            From Email
          </label>
          <input
            type="email"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            value={settings.email.emailFromAddress}
            onChange={(e) =>
              handleSettingChange("email", "emailFromAddress", e.target.value)
            }
          />
        </div>
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          checked={settings.email.enableEmailNotifications}
          onChange={(e) =>
            handleSettingChange(
              "email",
              "enableEmailNotifications",
              e.target.checked
            )
          }
        />
        <label className="ml-2 text-sm text-gray-700">
          Enable Email Notifications
        </label>
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <div>
        <h4 className="text-md font-medium text-gray-900 mb-4">
          Password Requirements
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Minimum Length
            </label>
            <input
              type="number"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={settings.security.passwordMinLength}
              onChange={(e) =>
                handleSettingChange(
                  "security",
                  "passwordMinLength",
                  e.target.value
                )
              }
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              checked={settings.security.passwordRequireUppercase}
              onChange={(e) =>
                handleSettingChange(
                  "security",
                  "passwordRequireUppercase",
                  e.target.checked
                )
              }
            />
            <label className="ml-2 text-sm text-gray-700">
              Require Uppercase Letters
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              checked={settings.security.passwordRequireLowercase}
              onChange={(e) =>
                handleSettingChange(
                  "security",
                  "passwordRequireLowercase",
                  e.target.checked
                )
              }
            />
            <label className="ml-2 text-sm text-gray-700">
              Require Lowercase Letters
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              checked={settings.security.passwordRequireNumbers}
              onChange={(e) =>
                handleSettingChange(
                  "security",
                  "passwordRequireNumbers",
                  e.target.checked
                )
              }
            />
            <label className="ml-2 text-sm text-gray-700">
              Require Numbers
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              checked={settings.security.passwordRequireSpecialChars}
              onChange={(e) =>
                handleSettingChange(
                  "security",
                  "passwordRequireSpecialChars",
                  e.target.checked
                )
              }
            />
            <label className="ml-2 text-sm text-gray-700">
              Require Special Characters
            </label>
          </div>
        </div>
      </div>

      <div>
        <h4 className="text-md font-medium text-gray-900 mb-4">
          Session Security
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Session Timeout (minutes)
            </label>
            <input
              type="number"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={settings.security.sessionTimeout}
              onChange={(e) =>
                handleSettingChange(
                  "security",
                  "sessionTimeout",
                  e.target.value
                )
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Max Login Attempts
            </label>
            <input
              type="number"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={settings.security.maxLoginAttempts}
              onChange={(e) =>
                handleSettingChange(
                  "security",
                  "maxLoginAttempts",
                  e.target.value
                )
              }
            />
          </div>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            checked={settings.security.enableTwoFactorAuth}
            onChange={(e) =>
              handleSettingChange(
                "security",
                "enableTwoFactorAuth",
                e.target.checked
              )
            }
          />
          <label className="ml-2 text-sm text-gray-700">
            Enable Two-Factor Authentication
          </label>
        </div>
      </div>
    </div>
  );

  const renderSubscriptionSettings = () => (
    <div className="space-y-6">
      <h4 className="text-md font-medium text-gray-900 mb-4">
        Subscription Plans
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Object.values(settings.subscriptions).map((plan, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
          >
            <div className="text-center">
              <h5 className="text-lg font-semibold text-gray-900 mb-2">
                {plan.name}
              </h5>
              <div className="text-3xl font-bold text-blue-600 mb-4">
                ${plan.price}
                <span className="text-sm text-gray-500">/month</span>
              </div>
              <ul className="space-y-2 text-left">
                <li className="flex items-center text-sm text-gray-600">
                  <FiStar className="h-4 w-4 text-yellow-500 mr-2" />
                  {plan.jobPostings} job postings
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <FiStar className="h-4 w-4 text-yellow-500 mr-2" />
                  {plan.featuredJobs} featured jobs
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <FiEye className="h-4 w-4 text-blue-500 mr-2" />
                  {plan.resumeViews} resume views
                </li>
                <li className="text-sm text-gray-600">
                  Duration: {plan.duration}
                </li>
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const tabs = [
    { id: "general", label: "General", icon: FiSettings },
    { id: "email", label: "Email", icon: FiMail },
    { id: "security", label: "Security", icon: FiLock },
    { id: "subscriptions", label: "Subscriptions", icon: FiCreditCard },
    { id: "notifications", label: "Notifications", icon: FiBell },
    { id: "featured", label: "Featured Jobs", icon: FiStar },
  ];

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">System Settings</h1>
        <p className="text-gray-600 mt-2">
          Configure system-wide settings and preferences
        </p>
      </div>

      <div className="bg-white rounded-lg shadow">
        {/* Tab Navigation */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6" aria-label="Tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <tab.icon className="h-5 w-5 mr-2" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === "general" && renderGeneralSettings()}
          {activeTab === "email" && renderEmailSettings()}
          {activeTab === "security" && renderSecuritySettings()}
          {activeTab === "subscriptions" && renderSubscriptionSettings()}

          {activeTab === "notifications" && (
            <div className="space-y-6">
              <h4 className="text-md font-medium text-gray-900 mb-4">
                Notification Settings
              </h4>
              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    checked={settings.notifications.emailNotifications}
                    onChange={(e) =>
                      handleSettingChange(
                        "notifications",
                        "emailNotifications",
                        e.target.checked
                      )
                    }
                  />
                  <label className="ml-2 text-sm text-gray-700">
                    Email Notifications
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    checked={settings.notifications.pushNotifications}
                    onChange={(e) =>
                      handleSettingChange(
                        "notifications",
                        "pushNotifications",
                        e.target.checked
                      )
                    }
                  />
                  <label className="ml-2 text-sm text-gray-700">
                    Push Notifications
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    checked={settings.notifications.smsNotifications}
                    onChange={(e) =>
                      handleSettingChange(
                        "notifications",
                        "smsNotifications",
                        e.target.checked
                      )
                    }
                  />
                  <label className="ml-2 text-sm text-gray-700">
                    SMS Notifications
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    checked={settings.notifications.newJobAlerts}
                    onChange={(e) =>
                      handleSettingChange(
                        "notifications",
                        "newJobAlerts",
                        e.target.checked
                      )
                    }
                  />
                  <label className="ml-2 text-sm text-gray-700">
                    New Job Alerts
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    checked={settings.notifications.applicationUpdates}
                    onChange={(e) =>
                      handleSettingChange(
                        "notifications",
                        "applicationUpdates",
                        e.target.checked
                      )
                    }
                  />
                  <label className="ml-2 text-sm text-gray-700">
                    Application Updates
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    checked={settings.notifications.systemAlerts}
                    onChange={(e) =>
                      handleSettingChange(
                        "notifications",
                        "systemAlerts",
                        e.target.checked
                      )
                    }
                  />
                  <label className="ml-2 text-sm text-gray-700">
                    System Alerts
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    checked={settings.notifications.marketingEmails}
                    onChange={(e) =>
                      handleSettingChange(
                        "notifications",
                        "marketingEmails",
                        e.target.checked
                      )
                    }
                  />
                  <label className="ml-2 text-sm text-gray-700">
                    Marketing Emails
                  </label>
                </div>
              </div>
            </div>
          )}

          {activeTab === "featured" && (
            <div className="space-y-6">
              <h4 className="text-md font-medium text-gray-900 mb-4">
                Featured Jobs Settings
              </h4>
              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    checked={settings.featuredJobs.enableFeaturedJobs}
                    onChange={(e) =>
                      handleSettingChange(
                        "featuredJobs",
                        "enableFeaturedJobs",
                        e.target.checked
                      )
                    }
                  />
                  <label className="ml-2 text-sm text-gray-700">
                    Enable Featured Jobs
                  </label>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Max Featured Jobs
                    </label>
                    <input
                      type="number"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      value={settings.featuredJobs.maxFeaturedJobs}
                      onChange={(e) =>
                        handleSettingChange(
                          "featuredJobs",
                          "maxFeaturedJobs",
                          e.target.value
                        )
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Featured Job Price ($)
                    </label>
                    <input
                      type="number"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      value={settings.featuredJobs.featuredJobPrice}
                      onChange={(e) =>
                        handleSettingChange(
                          "featuredJobs",
                          "featuredJobPrice",
                          e.target.value
                        )
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Featured Duration (days)
                    </label>
                    <input
                      type="number"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      value={settings.featuredJobs.featuredDuration}
                      onChange={(e) =>
                        handleSettingChange(
                          "featuredJobs",
                          "featuredDuration",
                          e.target.value
                        )
                      }
                    />
                  </div>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    checked={settings.featuredJobs.autoRenewFeatured}
                    onChange={(e) =>
                      handleSettingChange(
                        "featuredJobs",
                        "autoRenewFeatured",
                        e.target.checked
                      )
                    }
                  />
                  <label className="ml-2 text-sm text-gray-700">
                    Auto-renew Featured Jobs
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-between">
          <button
            onClick={() => handleResetSettings(activeTab)}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
          >
            Reset to Default
          </button>
          <button
            onClick={handleSaveSettings}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
          >
            <FiSave className="mr-2" />
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default SystemSettings;

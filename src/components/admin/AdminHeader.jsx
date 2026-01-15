import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiBell,
  FiMenu,
  FiSearch,
  FiUser,
  FiLogOut,
  FiCheck,
  FiX,
} from "react-icons/fi";
import useAuth from "../../hooks/useAuth";
import auditService from "../../services/auditService";

const AdminHeader = ({ toggleSidebar }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  useEffect(() => {
    const load = async () => {
      try {
        const response = await auditService.getAuditLogs({ limit: 5 });
        const logs = response.data?.logs || [];

        const mapped = logs.map((log) => {
          const action = log.action || "AUDIT";
          const message = log.details || action.replace(/_/g, " ");
          const time = new Date(log.createdAt).toLocaleString();

          let type = "info";
          if (action.includes("DELETE") || action.includes("BLOCK"))
            type = "error";
          if (action.includes("CREATE") || action.includes("REGISTER"))
            type = "success";

          return {
            id: log.id,
            type,
            message,
            time,
            read: false,
          };
        });

        setNotifications(mapped);
      } catch {
        setNotifications([]);
      }
    };

    load();
  }, []);

  const unreadCount = useMemo(
    () => notifications.filter((n) => !n.read).length,
    [notifications]
  );

  const getNotificationIcon = (type) => {
    switch (type) {
      case "success":
        return <FiCheck className="w-4 h-4 text-green-600" />;
      case "error":
        return <FiX className="w-4 h-4 text-red-600" />;
      default:
        return <FiBell className="w-4 h-4 text-blue-600" />;
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case "success":
        return "bg-green-50 border-green-200";
      case "error":
        return "bg-red-50 border-red-200";
      case "warning":
        return "bg-yellow-50 border-yellow-200";
      default:
        return "bg-blue-50 border-blue-200";
    }
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="flex items-center justify-between px-6 py-3">
        <div className="flex items-center">
          <button
            onClick={toggleSidebar}
            className="p-2 text-gray-500 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 lg:hidden"
          >
            <FiMenu className="w-6 h-6" />
          </button>
          <div className="relative mx-4 lg:mx-0">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <FiSearch className="w-5 h-5 text-gray-400" />
            </span>
            <input
              className="w-32 pl-10 pr-4 py-2 text-gray-700 bg-gray-100 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white focus:border-transparent sm:w-64"
              placeholder="Search..."
              type="text"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <button
              onClick={() => setIsNotificationOpen(!isNotificationOpen)}
              className="p-2 text-gray-500 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 relative"
            >
              <FiBell className="w-6 h-6" />
              {unreadCount > 0 && (
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white"></span>
              )}
            </button>

            {isNotificationOpen && (
              <div className="absolute right-0 w-80 mt-2 bg-white rounded-md shadow-lg z-50 max-h-96 overflow-y-auto">
                <div className="px-4 py-3 border-b border-gray-200">
                  <h3 className="text-sm font-medium text-gray-900">
                    Notifications
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    {unreadCount} unread notifications
                  </p>
                </div>
                <div className="divide-y divide-gray-200">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`px-4 py-3 hover:bg-gray-50 ${getNotificationColor(
                        notification.type
                      )} border-l-4 ${
                        !notification.read ? "font-semibold" : ""
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0 mt-0.5">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-gray-900">
                            {notification.message}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {notification.time}
                          </p>
                        </div>
                        {!notification.read && (
                          <div className="flex-shrink-0">
                            <span className="inline-block h-2 w-2 rounded-full bg-blue-600"></span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="px-4 py-3 border-t border-gray-200">
                  <button className="text-sm text-indigo-600 hover:text-indigo-900 font-medium">
                    Mark all as read
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center space-x-2 text-sm text-gray-700 focus:outline-none"
            >
              <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                <FiUser className="w-5 h-5 text-indigo-600" />
              </div>
              <span className="hidden md:inline-block">
                {user?.name || "Admin"}
              </span>
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 w-48 mt-2 bg-white rounded-md shadow-lg py-1 z-50">
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Your Profile
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Settings
                </a>
                <a
                  href="#"
                  className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  onClick={(e) => {
                    e.preventDefault();
                    logout();
                    navigate("/login");
                  }}
                >
                  <FiLogOut className="w-4 h-4 mr-2" />
                  Sign out
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;

import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

const NotificationContext = createContext();

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotifications must be used within a NotificationProvider"
    );
  }
  return context;
};

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState(() => {
    const savedNotifications = localStorage.getItem("notifications");
    return savedNotifications ? JSON.parse(savedNotifications) : [];
  });

  // Calculate unread count from notifications
  const unreadCount = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    localStorage.setItem("notifications", JSON.stringify(notifications));
  }, [notifications]);

  // Add a new notification
  const addNotification = (notification) => {
    const newNotification = {
      id: Date.now(),
      ...notification,
      timestamp: new Date().toISOString(),
      read: false,
    };
    setNotifications((prev) => [newNotification, ...prev]);
    return newNotification;
  };

  // Mark notification as read
  const markAsRead = (notificationId) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === notificationId ? { ...notif, read: true } : notif
      )
    );
  };

  // Mark all notifications as read
  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notif) => ({ ...notif, read: true })));
  };

  // Delete notification
  const deleteNotification = (notificationId) => {
    setNotifications((prev) =>
      prev.filter((notif) => notif.id !== notificationId)
    );
  };

  // Clear all notifications
  const clearAllNotifications = () => {
    setNotifications([]);
  };

  // Job alert notification
  const createJobAlert = (job, userSkills) => {
    const matchReason =
      job.title.toLowerCase().includes(userSkills.toLowerCase()) ||
      job.requirements.toLowerCase().includes(userSkills.toLowerCase());

    if (matchReason) {
      addNotification({
        type: "job_alert",
        title: "New Job Match!",
        message: `New job "${job.title}" at ${job.company} matches your profile`,
        jobId: job.id,
        priority: "high",
      });
    }
  };

  // Application status update notification
  const createApplicationStatusNotification = (
    application,
    oldStatus,
    newStatus
  ) => {
    const statusMessages = {
      viewed: "Your application has been viewed by the employer",
      shortlisted:
        "Congratulations! You have been shortlisted for the position",
      rejected: "Unfortunately, your application was not selected",
      offered: "Congratulations! You have received a job offer",
    };

    addNotification({
      type: "application_update",
      title: "Application Status Updated",
      message:
        statusMessages[newStatus] ||
        `Your application status is now ${newStatus}`,
      applicationId: application.id,
      jobId: application.jobId,
      priority: newStatus === "offered" ? "high" : "medium",
    });
  };

  const value = {
    notifications,
    unreadCount,
    addNotification,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearAllNotifications,
    createJobAlert,
    createApplicationStatusNotification,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;

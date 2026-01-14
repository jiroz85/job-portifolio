// Permission constants
export const PERMISSIONS = {
  // User permissions
  VIEW_PROFILE: "view_profile",
  EDIT_PROFILE: "edit_profile",
  DELETE_ACCOUNT: "delete_account",

  // Job permissions
  VIEW_JOBS: "view_jobs",
  APPLY_JOBS: "apply_jobs",
  CREATE_JOBS: "create_jobs",
  EDIT_JOBS: "edit_jobs",
  DELETE_JOBS: "delete_jobs",
  MANAGE_APPLICATIONS: "manage_applications",

  // Admin permissions
  MANAGE_USERS: "manage_users",
  VIEW_AUDIT_LOGS: "view_audit_logs",
  MANAGE_SYSTEM: "manage_system",
  EXPORT_DATA: "export_data",

  // Employer permissions
  VIEW_OWN_JOBS: "view_own_jobs",
  MANAGE_OWN_APPLICATIONS: "manage_own_applications",
};

// Role-based permissions mapping
export const ROLE_PERMISSIONS = {
  admin: [
    PERMISSIONS.VIEW_PROFILE,
    PERMISSIONS.EDIT_PROFILE,
    PERMISSIONS.VIEW_JOBS,
    PERMISSIONS.MANAGE_USERS,
    PERMISSIONS.VIEW_AUDIT_LOGS,
    PERMISSIONS.MANAGE_SYSTEM,
    PERMISSIONS.EXPORT_DATA,
    PERMISSIONS.CREATE_JOBS,
    PERMISSIONS.EDIT_JOBS,
    PERMISSIONS.DELETE_JOBS,
    PERMISSIONS.MANAGE_APPLICATIONS,
  ],
  employer: [
    PERMISSIONS.VIEW_PROFILE,
    PERMISSIONS.EDIT_PROFILE,
    PERMISSIONS.VIEW_JOBS,
    PERMISSIONS.CREATE_JOBS,
    PERMISSIONS.EDIT_JOBS,
    PERMISSIONS.DELETE_JOBS,
    PERMISSIONS.VIEW_OWN_JOBS,
    PERMISSIONS.MANAGE_OWN_APPLICATIONS,
  ],
  jobseeker: [
    PERMISSIONS.VIEW_PROFILE,
    PERMISSIONS.EDIT_PROFILE,
    PERMISSIONS.VIEW_JOBS,
    PERMISSIONS.APPLY_JOBS,
    PERMISSIONS.DELETE_ACCOUNT,
  ],
};

// Check if user has specific permission
export const hasPermission = (user, permission) => {
  if (!user || !user.role) {
    return false;
  }

  const userPermissions = ROLE_PERMISSIONS[user.role] || [];
  return userPermissions.includes(permission);
};

// Check if user has any of the specified permissions
export const hasAnyPermission = (user, permissions) => {
  if (!user || !permissions || !Array.isArray(permissions)) {
    return false;
  }

  return permissions.some((permission) => hasPermission(user, permission));
};

// Check if user has all of the specified permissions
export const hasAllPermissions = (user, permissions) => {
  if (!user || !permissions || !Array.isArray(permissions)) {
    return false;
  }

  return permissions.every((permission) => hasPermission(user, permission));
};

// Check if user can access specific route
export const canAccessRoute = (user, route) => {
  if (!user || !route) {
    return false;
  }

  const routePermissions = {
    "/admin/dashboard": [PERMISSIONS.MANAGE_SYSTEM],
    "/admin/users": [PERMISSIONS.MANAGE_USERS],
    "/admin/audit": [PERMISSIONS.VIEW_AUDIT_LOGS],
    "/employer/dashboard": [PERMISSIONS.VIEW_OWN_JOBS],
    "/employer/jobs": [PERMISSIONS.CREATE_JOBS],
    "/employer/applications": [PERMISSIONS.MANAGE_OWN_APPLICATIONS],
    "/profile": [PERMISSIONS.VIEW_PROFILE],
    "/settings": [PERMISSIONS.EDIT_PROFILE],
    "/jobs": [PERMISSIONS.VIEW_JOBS],
    "/apply": [PERMISSIONS.APPLY_JOBS],
  };

  const requiredPermissions = routePermissions[route];
  if (!requiredPermissions) {
    return true; // Public route
  }

  return hasAnyPermission(user, requiredPermissions);
};

// Get user's accessible routes
export const getAccessibleRoutes = (user) => {
  const allRoutes = [
    {
      path: "/dashboard",
      label: "Dashboard",
      permissions: [PERMISSIONS.VIEW_PROFILE],
    },
    {
      path: "/jobs",
      label: "Browse Jobs",
      permissions: [PERMISSIONS.VIEW_JOBS],
    },
    {
      path: "/profile",
      label: "Profile",
      permissions: [PERMISSIONS.VIEW_PROFILE],
    },
    {
      path: "/settings",
      label: "Settings",
      permissions: [PERMISSIONS.EDIT_PROFILE],
    },
    {
      path: "/admin/dashboard",
      label: "Admin Dashboard",
      permissions: [PERMISSIONS.MANAGE_SYSTEM],
    },
    {
      path: "/admin/users",
      label: "User Management",
      permissions: [PERMISSIONS.MANAGE_USERS],
    },
    {
      path: "/admin/audit",
      label: "Audit Logs",
      permissions: [PERMISSIONS.VIEW_AUDIT_LOGS],
    },
    {
      path: "/employer/dashboard",
      label: "Employer Dashboard",
      permissions: [PERMISSIONS.VIEW_OWN_JOBS],
    },
    {
      path: "/employer/jobs",
      label: "My Jobs",
      permissions: [PERMISSIONS.CREATE_JOBS],
    },
    {
      path: "/employer/applications",
      label: "Applications",
      permissions: [PERMISSIONS.MANAGE_OWN_APPLICATIONS],
    },
  ];

  return allRoutes.filter((route) => hasAnyPermission(user, route.permissions));
};

// Permission-based component wrapper
export const withPermission = (
  Component,
  requiredPermissions,
  options = {}
) => {
  return (props) => {
    const { user } = options.authContext || {};

    const hasAccess = Array.isArray(requiredPermissions)
      ? hasAnyPermission(user, requiredPermissions)
      : hasPermission(user, requiredPermissions);

    if (!hasAccess) {
      return options.fallback || <div>Access Denied</div>;
    }

    return <Component {...props} />;
  };
};

export default {
  PERMISSIONS,
  ROLE_PERMISSIONS,
  hasPermission,
  hasAnyPermission,
  hasAllPermissions,
  canAccessRoute,
  getAccessibleRoutes,
  withPermission,
};

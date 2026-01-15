import React from "react";
import useAuth from "../../hooks/useAuth";
import { hasPermission } from "../../utils/permissions";

const PermissionGuard = ({
  children,
  requiredPermission,
  role,
  fallback = null,
  requireAll = false,
}) => {
  const { user } = useAuth();

  if (!user) {
    return fallback;
  }

  let hasAccess = false;

  if (requiredPermission) {
    if (Array.isArray(requiredPermission)) {
      hasAccess = requireAll
        ? requiredPermission.every((perm) => hasPermission(user, perm))
        : requiredPermission.some((perm) => hasPermission(user, perm));
    } else {
      hasAccess = hasPermission(user, requiredPermission);
    }
  }

  if (role) {
    if (Array.isArray(role)) {
      hasAccess = hasAccess || role.includes(user.role);
    } else {
      hasAccess = hasAccess || user.role === role;
    }
  }

  return hasAccess ? children : fallback;
};

export default PermissionGuard;

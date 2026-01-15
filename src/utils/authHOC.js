import React from "react";
import useAuth from "../hooks/useAuth";
import { hasPermission, canAccessRoute } from "./permissions";
import { Navigate } from "react-router-dom";

// Higher-order component for authentication
export const withAuth = (Component, options = {}) => {
  const WrappedComponent = (props) => {
    const { user, loading } = useAuth();

    if (loading) {
      return (
        options.loadingComponent || (
          <div className="flex items-center justify-center min-h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        )
      );
    }

    if (!user) {
      return options.redirectTo ? (
        <Navigate to={options.redirectTo} replace />
      ) : (
        options.fallback || <div>Please log in to access this page.</div>
      );
    }

    return <Component {...props} user={user} />;
  };

  WrappedComponent.displayName = `withAuth(${
    Component.displayName || Component.name
  })`;
  return WrappedComponent;
};

// Higher-order component for role-based access
export const withRole = (Component, requiredRoles, options = {}) => {
  const WrappedComponent = (props) => {
    const { user, loading } = useAuth();

    if (loading) {
      return (
        options.loadingComponent || (
          <div className="flex items-center justify-center min-h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        )
      );
    }

    if (!user) {
      return options.redirectTo ? (
        <Navigate to={options.redirectTo} replace />
      ) : (
        options.fallback || <div>Please log in to access this page.</div>
      );
    }

    const hasRequiredRole = Array.isArray(requiredRoles)
      ? requiredRoles.includes(user.role)
      : user.role === requiredRoles;

    if (!hasRequiredRole) {
      return options.redirectTo ? (
        <Navigate to={options.redirectTo} replace />
      ) : (
        options.fallback || <div>Access denied. Insufficient permissions.</div>
      );
    }

    return <Component {...props} user={user} />;
  };

  WrappedComponent.displayName = `withRole(${
    Component.displayName || Component.name
  })`;
  return WrappedComponent;
};

// Higher-order component for permission-based access
export const withPermission = (
  Component,
  requiredPermissions,
  options = {}
) => {
  const WrappedComponent = (props) => {
    const { user, loading } = useAuth();

    if (loading) {
      return (
        options.loadingComponent || (
          <div className="flex items-center justify-center min-h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        )
      );
    }

    if (!user) {
      return options.redirectTo ? (
        <Navigate to={options.redirectTo} replace />
      ) : (
        options.fallback || <div>Please log in to access this page.</div>
      );
    }

    const hasRequiredPermission = Array.isArray(requiredPermissions)
      ? requiredPermissions.some((permission) =>
          hasPermission(user, permission)
        )
      : hasPermission(user, requiredPermissions);

    if (!hasRequiredPermission) {
      return options.redirectTo ? (
        <Navigate to={options.redirectTo} replace />
      ) : (
        options.fallback || <div>Access denied. Insufficient permissions.</div>
      );
    }

    return <Component {...props} user={user} />;
  };

  WrappedComponent.displayName = `withPermission(${
    Component.displayName || Component.name
  })`;
  return WrappedComponent;
};

// Higher-order component for route-based access
export const withRouteAccess = (Component, route, options = {}) => {
  const WrappedComponent = (props) => {
    const { user, loading } = useAuth();

    if (loading) {
      return (
        options.loadingComponent || (
          <div className="flex items-center justify-center min-h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        )
      );
    }

    if (!user) {
      return options.redirectTo ? (
        <Navigate to={options.redirectTo} replace />
      ) : (
        options.fallback || <div>Please log in to access this page.</div>
      );
    }

    const canAccess = canAccessRoute(user, route);

    if (!canAccess) {
      return options.redirectTo ? (
        <Navigate to={options.redirectTo} replace />
      ) : (
        options.fallback || (
          <div>
            Access denied. You don't have permission to access this page.
          </div>
        )
      );
    }

    return <Component {...props} user={user} />;
  };

  WrappedComponent.displayName = `withRouteAccess(${
    Component.displayName || Component.name
  })`;
  return WrappedComponent;
};

// Combined HOC for multiple authentication checks
export const withAuthChecks = (Component, checks = [], options = {}) => {
  const WrappedComponent = (props) => {
    const { user, loading } = useAuth();

    if (loading) {
      return (
        options.loadingComponent || (
          <div className="flex items-center justify-center min-h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        )
      );
    }

    if (!user && checks.some((check) => check.type === "auth")) {
      return options.redirectTo ? (
        <Navigate to={options.redirectTo} replace />
      ) : (
        options.fallback || <div>Please log in to access this page.</div>
      );
    }

    // Check each condition
    for (const check of checks) {
      switch (check.type) {
        case "role": {
          const hasRole = Array.isArray(check.value)
            ? check.value.includes(user.role)
            : user.role === check.value;
          if (!hasRole) {
            return (
              options.fallback || (
                <div>Access denied. Insufficient role permissions.</div>
              )
            );
          }
          break;
        }

        case "permission": {
          const hasPermission = Array.isArray(check.value)
            ? check.value.some((permission) => hasPermission(user, permission))
            : hasPermission(user, check.value);
          if (!hasPermission) {
            return (
              options.fallback || (
                <div>Access denied. Insufficient permissions.</div>
              )
            );
          }
          break;
        }

        case "route": {
          const canAccess = canAccessRoute(user, check.value);
          if (!canAccess) {
            return (
              options.fallback || <div>Access denied. Route access denied.</div>
            );
          }
          break;
        }

        default:
          console.warn(`Unknown auth check type: ${check.type}`);
      }
    }

    return <Component {...props} user={user} />;
  };

  WrappedComponent.displayName = `withAuthChecks(${
    Component.displayName || Component.name
  })`;
  return WrappedComponent;
};

export default {
  withAuth,
  withRole,
  withPermission,
  withRouteAccess,
  withAuthChecks,
};

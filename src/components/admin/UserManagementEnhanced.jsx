import React, { useState, useEffect } from "react";
import {
  FiUsers,
  FiSearch,
  FiFilter,
  FiEdit2,
  FiTrash2,
  FiShield,
  FiUserPlus,
  FiUserX,
} from "react-icons/fi";
import DataTable from "./DataTable";
import useAuth from "../../hooks/useAuth";
import userApi from "../../services/userApi";
import auditService from "../../services/auditService";

const UserManagementEnhanced = () => {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await userApi.getAllUsers();
      // Handle the backend response format: { success: true, data: { users: [], pagination: {} } }
      setUsers(response.data?.users || []);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
      await userApi.updateUserRole(userId, newRole);
      await auditService.logAction({
        action: "ROLE_CHANGE",
        targetUserId: userId,
        details: `Changed role to ${newRole}`,
        performedBy: currentUser.id,
      });
      fetchUsers();
      setShowRoleModal(false);
      setEditingUser(null);
    } catch (error) {
      console.error("Error updating user role:", error);
    }
  };

  const handleUserStatusChange = async (userId, status) => {
    try {
      await userApi.updateUserStatus(userId, status);
      await auditService.logAction({
        action: "STATUS_CHANGE",
        targetUserId: userId,
        details: `Changed status to ${status}`,
        performedBy: currentUser.id,
      });
      fetchUsers();
    } catch (error) {
      console.error("Error updating user status:", error);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (
      window.confirm(
        "Are you sure you want to delete this user? This action cannot be undone."
      )
    ) {
      try {
        await userApi.deleteUser(userId);
        await auditService.logAction({
          action: "USER_DELETE",
          targetUserId: userId,
          details: "User deleted by admin",
          performedBy: currentUser.id,
        });
        fetchUsers();
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === "all" || user.role === filterRole;
    return matchesSearch && matchesRole;
  });

  const columns = [
    {
      header: "User",
      accessor: "name",
      cell: (row) => (
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
            <FiUsers className="text-gray-600" />
          </div>
          <div>
            <div className="font-medium text-gray-900">{row.name}</div>
            <div className="text-sm text-gray-500">{row.email}</div>
          </div>
        </div>
      ),
    },
    {
      header: "Role",
      accessor: "role",
      cell: (row) => (
        <span
          className={`px-2 py-1 text-xs font-medium rounded-full ${
            row.role === "admin"
              ? "bg-purple-100 text-purple-800"
              : row.role === "employer"
              ? "bg-blue-100 text-blue-800"
              : "bg-green-100 text-green-800"
          }`}
        >
          {row.role}
        </span>
      ),
    },
    {
      header: "Status",
      accessor: "status",
      cell: (row) => (
        <span
          className={`px-2 py-1 text-xs font-medium rounded-full ${
            row.status === "active"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {row.status}
        </span>
      ),
    },
    {
      header: "Joined",
      accessor: "createdAt",
      cell: (row) => new Date(row.createdAt).toLocaleDateString(),
    },
    {
      header: "Actions",
      accessor: "actions",
      cell: (row) => (
        <div className="flex items-center space-x-2">
          <button
            onClick={() => {
              setEditingUser(row);
              setShowRoleModal(true);
            }}
            className="text-blue-600 hover:text-blue-800"
            title="Edit Role"
          >
            <FiEdit2 size={16} />
          </button>
          <button
            onClick={() =>
              handleUserStatusChange(
                row.id,
                row.status === "active" ? "inactive" : "active"
              )
            }
            className={
              row.status === "active"
                ? "text-red-600 hover:text-red-800"
                : "text-green-600 hover:text-green-800"
            }
            title={row.status === "active" ? "Deactivate" : "Activate"}
          >
            {row.status === "active" ? (
              <FiUserX size={16} />
            ) : (
              <FiUserPlus size={16} />
            )}
          </button>
          <button
            onClick={() => handleDeleteUser(row.id)}
            className="text-red-600 hover:text-red-800"
            title="Delete User"
          >
            <FiTrash2 size={16} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Roles</option>
            <option value="admin">Admin</option>
            <option value="employer">Employer</option>
            <option value="jobseeker">Job Seeker</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <DataTable columns={columns} data={filteredUsers} loading={loading} />
      </div>

      {showRoleModal && editingUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h3 className="text-lg font-semibold mb-4">Change User Role</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select New Role
              </label>
              <select
                value={editingUser.role}
                onChange={(e) =>
                  setEditingUser({ ...editingUser, role: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="jobseeker">Job Seeker</option>
                <option value="employer">Employer</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowRoleModal(false);
                  setEditingUser(null);
                }}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={() =>
                  handleRoleChange(editingUser.id, editingUser.role)
                }
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Update Role
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagementEnhanced;

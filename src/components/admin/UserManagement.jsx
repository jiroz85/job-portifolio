import React, { useState, useEffect } from "react";
import { DataTable } from "./DataTable";
import useAdmin from "../../hooks/useAdmin";
import { toast } from "react-toastify";

const UserManagement = () => {
  const { fetchUsers, updateUserStatus, deleteUser, loading, error } =
    useAdmin();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const data = await fetchUsers();
      setUsers(data);
    } catch (err) {
      toast.error(error || "Failed to load users");
    }
  };

  const handleStatusChange = async (userId, status) => {
    try {
      await updateUserStatus(userId, status);
      setUsers(
        users.map((user) => (user._id === userId ? { ...user, status } : user))
      );
      toast.success("User status updated successfully");
    } catch (err) {
      toast.error("Failed to update user status");
    }
  };

  const handleDelete = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteUser(userId);
        setUsers(users.filter((user) => user._id !== userId));
        toast.success("User deleted successfully");
      } catch (err) {
        toast.error("Failed to delete user");
      }
    }
  };

  const columns = [
    { key: "name", header: "Name" },
    { key: "email", header: "Email" },
    { key: "role", header: "Role" },
    { key: "status", header: "Status" },
  ];

  const userData = users.map((user) => ({
    ...user,
    actions: (
      <div className="space-x-2">
        <select
          value={user.status}
          onChange={(e) => handleStatusChange(user._id, e.target.value)}
          className="text-sm p-1 border rounded"
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="suspended">Suspended</option>
        </select>
        <button
          onClick={() => handleDelete(user._id)}
          className="ml-2 text-red-600 hover:text-red-800"
        >
          Delete
        </button>
      </div>
    ),
  }));

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">User Management</h2>
        </div>
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <DataTable
            columns={[...columns, { key: "actions", header: "Actions" }]}
            data={userData}
          />
        )}
      </div>
    </div>
  );
};

export default UserManagement;

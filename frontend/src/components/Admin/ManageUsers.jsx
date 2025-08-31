// src/components/Admin/ManageUsers.js
import React, { useEffect } from 'react';
import { FaUserShield, FaTrashAlt, FaUserEdit } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllUsers, deleteUser, updateUserRole } from '../../actions/admin';

function ManageUsers() {
  const dispatch = useDispatch();
  const { allUsers, loading, error } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  const handleDelete = (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      dispatch(deleteUser(userId));
    }
  };

  const handleChangeRole = (userId, newRole) => {
    dispatch(updateUserRole(userId, newRole));
  };

  if (loading) return <p className="p-4">Loading users...</p>;
  if (error) return <p className="p-4 text-red-500">Error: {error}</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-blue-100 to-green-200 flex flex-col items-center justify-center px-2 sm:px-8 py-10">
      <div className="w-full max-w-5xl mx-auto bg-white/90 rounded-2xl shadow-2xl p-8">
        <h2 className="text-3xl sm:text-4xl font-black mb-8 text-green-800 drop-shadow text-center flex items-center justify-center gap-2">
          <FaUserShield className="text-green-600 text-3xl sm:text-4xl" /> Manage Users
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 rounded-xl shadow-lg">
            <thead className="bg-green-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-bold text-green-700 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-green-700 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-green-700 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-green-700 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-green-100">
              {allUsers.map((user) => (
                <tr key={user._id} className="hover:bg-green-50 transition">
                  <td className="px-6 py-4 whitespace-nowrap font-semibold text-green-900">{user.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-blue-900">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 rounded-full font-bold text-xs ${user.role === 'admin' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>{user.role}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap space-x-2 flex items-center">
                    <button
                      onClick={() => handleChangeRole(user._id, user.role === 'guardian' ? 'admin' : 'guardian')}
                      className="bg-green-500 text-white px-4 py-2 rounded-xl shadow hover:bg-green-600 transition flex items-center gap-2 font-bold"
                    >
                      <FaUserEdit className="text-white" />
                      {user.role === 'guardian' ? 'Make Admin' : 'Make Guardian'}
                    </button>
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-xl shadow hover:bg-red-600 transition flex items-center gap-2 font-bold"
                    >
                      <FaTrashAlt className="text-white" /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ManageUsers;
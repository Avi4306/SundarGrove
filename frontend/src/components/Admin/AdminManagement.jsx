// src/components/Admin/AdminDashboard.js
import React from 'react';
import { FaUsers, FaFileAlt, FaCheckCircle } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Navigate, Link } from 'react-router-dom';

function AdminDashboard() {
  const { user, loading } = useSelector((state) => state.auth);

  // Check if the user is loading or not an admin
  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  // Redirect to the home page if the user is not an admin
  if (!user || user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-blue-100 to-green-200 flex flex-col items-center justify-center px-2 sm:px-8 py-10">
      <div className="w-full max-w-5xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-black mb-6 text-green-800 drop-shadow text-center">Admin Dashboard</h1>
        <p className="text-lg text-center mb-8">Welcome, <span className="font-bold text-blue-700">Admin {user.name}</span>!</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
          <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center hover:shadow-2xl transition-shadow duration-300 border-t-4 border-green-400">
            <FaUsers className="text-4xl text-green-600 mb-2" />
            <h3 className="text-xl font-bold text-green-800 mb-1">User Count</h3>
            <p className="text-4xl font-extrabold text-green-700">1,234</p>
          </div>
          <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center hover:shadow-2xl transition-shadow duration-300 border-t-4 border-blue-400">
            <FaFileAlt className="text-4xl text-blue-600 mb-2" />
            <h3 className="text-xl font-bold text-blue-800 mb-1">Reports</h3>
            <p className="text-4xl font-extrabold text-blue-700">56</p>
          </div>
          <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center hover:shadow-2xl transition-shadow duration-300 border-t-4 border-yellow-400">
            <FaCheckCircle className="text-4xl text-yellow-600 mb-2" />
            <h3 className="text-xl font-bold text-yellow-800 mb-1">Verified Content</h3>
            <p className="text-4xl font-extrabold text-yellow-700">32</p>
          </div>
        </div>
        {/* Navigation to other admin pages */}
        <nav className="flex flex-wrap gap-4 justify-center">
          <Link
            to="/admin/users"
            className="bg-blue-500 text-white px-6 py-3 rounded-xl font-bold shadow hover:bg-blue-600 transition-all duration-200 hover:scale-105"
          >
            Manage Users
          </Link>
          <Link
            to="/admin/reports"
            className="bg-green-500 text-white px-6 py-3 rounded-xl font-bold shadow hover:bg-green-600 transition-all duration-200 hover:scale-105"
          >
            Manage Reports
          </Link>
        </nav>
      </div>
    </div>
  );
}

export default AdminDashboard;
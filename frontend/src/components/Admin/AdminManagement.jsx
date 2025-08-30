// src/components/Admin/AdminDashboard.js
import React from 'react';
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
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <p className="text-lg">Welcome, Admin {user.name}!</p>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold">User Count</h3>
          <p className="text-4xl mt-2">1,234</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold">Reports</h3>
          <p className="text-4xl mt-2">56</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold">Verified Content</h3>
          <p className="text-4xl mt-2">32</p>
        </div>
      </div>
      {/* Navigation to other admin pages */}
      <nav className="mt-8 flex gap-4">
        <Link
        to="/admin/users"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
        Manage Users
        </Link>

        <Link
        to="/admin/reports"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
        Manage Reports
        </Link>
      </nav>
    </div>
  );
}

export default AdminDashboard;
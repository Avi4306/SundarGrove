import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate, Link } from 'react-router-dom';
import { fetchUserCount, fetchAllRequests } from '../../actions/admin';

function AdminDashboard() {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);
  const { userCount, allRequests } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(fetchUserCount());
    dispatch(fetchAllRequests());
  }, [dispatch]);

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

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
          <p className="text-4xl mt-2">{userCount}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold">Reports</h3>
          <p className="text-4xl mt-2">{allRequests.length}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold">Verified Content</h3>
          <p className="text-4xl mt-2">{allRequests.filter(r => r.status === "accepted").length}</p>
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
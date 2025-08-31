import { Routes, Route, Link } from "react-router-dom";
import Login from "./components/User/Login";
import Register from "./components/User/Register";
import Profile from "./components/User/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import { useDispatch, useSelector } from "react-redux";
import Reports from "./components/Reports/Reports";
import Homepage from "./components/Home/Homepage";
import './App.css';
import React, { lazy, Suspense, useEffect } from "react";
import SmsButton from './components/sms.jsx';
const managerNumber = '+919876543210';
const dailyReport = 'System status: OK. All tasks completed.';
import img1 from "./assets/SG-1.jpg"
import img2 from "./assets/SG-2.jpg"
const MangroveMap = lazy(() => import("./components/map.jsx"));import AdminDashboard from "./components/Admin/AdminManagement.jsx";
import ManageUsers from "./components/Admin/ManageUsers.jsx";
import ModerateReports from "./components/Admin/ModerateReports.jsx";
import Leaderboard from "./components/Leaderboard/Leaderboard";
import { fetchAllRequests } from "./actions/admin.js";

function App() {
  const dispatch = useDispatch()
  const allRequests = useSelector(state => state.admin.allRequests || []);
  useEffect(() => {
    dispatch(fetchAllRequests());
  }, [dispatch]);
  const reportMarkers = allRequests
     .filter(r => r.location && r.location.coordinates && r.location.coordinates.length === 2)
     .map(r => ({
       position: [r.location.coordinates[1], r.location.coordinates[0]], // [lat, lng]
       status: r.status,
       popup: {
         place: r.location.place || "Unknown",
         threat: r.type || "Unknown",
         image: r.imageUrl || null
       }
     }));
  
  return (
    <Routes>
      <Route path="/" element={
        <Homepage />
      } />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/reports"
        element={
            <Reports />
        }
      />
      <Route
        path="/profile"
        element={
            <Profile />
        }
      />
      <Route
        path="/leaderboard"
        element={<Leaderboard />}
  />
       <Route path="/map" element={
          <Suspense fallback={<div className="text-center py-20 text-lg text-green-700">Loading map...</div>}>
            <div style={{ height: "auto", width: "auto" }}>
              <MangroveMap geoJsonPath="/mangrove_india.geojson" markers={reportMarkers} />
            </div>
          </Suspense>
        }></Route>

      <Route element={<ProtectedRoute role="admin" />}>
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<ManageUsers />} />
        <Route path="/admin/reports" element={<ModerateReports />} />
      </Route>

      <Route path="/unauthorized" element={
            <div style={{ textAlign: 'center', padding: '50px', color: '#dc2626' }}>
              <h1>403 - Forbidden</h1>
              <p>You do not have permission to access this page.</p>
              <p><Link to="/" style={{ color: '#44403c', textDecoration: 'underline' }}>Go to Home</Link></p>
            </div>
        } />

      <Route path="*" element={
        <div style={{ textAlign: 'center', padding: '50px', color: '#78716c' }}>
          <h1>404 - Page Not Found</h1>
          <p>The page you are looking for does not exist.</p>
          <p><Link to="/" style={{ color: '#44403c', textDecoration: 'underline' }}>Go to Home</Link></p>
        </div>
      } />
    </Routes>
  );
}

export default App;
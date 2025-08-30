import { Routes, Route, Link } from "react-router-dom";
import Login from "./components/User/Login";
import Register from "./components/User/Register";
import Profile from "./components/User/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import { useSelector } from "react-redux";
import Reports from "./components/Reports/Reports";
import Homepage from "./components/Home/Homepage";
import './App.css';
import React, { lazy, Suspense } from "react";
import SmsButton from './components/sms.jsx';
const managerNumber = '+919876543210';
const dailyReport = 'System status: OK. All tasks completed.';
import img1 from "./assets/SG-1.jpg"
import img2 from "./assets/SG-2.jpg"
const MangroveMap = lazy(() => import("./components/map.jsx"));import AdminDashboard from "./components/Admin/AdminManagement.jsx";
import ManageUsers from "./components/Admin/ManageUsers.jsx";
import ModerateReports from "./components/Admin/ModerateReports.jsx";
import Leaderboard from "./components/Leaderboard/Leaderboard";

const markers = [
  { position: [23.0225, 72.5714], status: 'pending', popup: {place:'amd',threat:'cutting',image:img1} },
  { position: [19.076, 72.8777], status: 'confirmed', popup: {place:'mumbai',threat:'deforestation',image:img2} },
  { position: [22.5726, 88.3639], status: 'flagged', popup: {place:'kolkata',threat:'false report',image:null} },
  { position: [15.2993, 74.1240], status: 'pending', popup: {place:'goa',threat:'dumping',image:null} },
];

function App() {

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
              <MangroveMap geoJsonPath="/mangrove_india.geojson" markers={markers} />
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
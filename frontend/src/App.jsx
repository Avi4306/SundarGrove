import { Routes, Route, Link } from "react-router-dom";
import Login from "./components/User/Login";
import Register from "./components/User/Register";
import Profile from "./components/User/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import { useSelector } from "react-redux";
import Reports from "./components/Reports/Reports";
import Homepage from "./components/Home/Homepage";
import './App.css';
import MangroveMap from "./components/map.jsx"
import img1 from "./assets/SG-1.jpg"
import img2 from "./assets/SG-2.jpg"
import AdminDashboard from "./components/Admin/AdminManagement.jsx";
import ManageUsers from "./components/Admin/ManageUsers.jsx";
import ModerateReports from "./components/Admin/ModerateReports.jsx";
import Leaderboard from "./components/Leaderboard/Leaderboard";

const markers = [
  { position: [23.0225, 72.5714], popup: {place:'amd',threat:'cutting',image:img1} },
  { position: [19.076, 72.8777], popup: {place:'mumbai',threat:'deforestation',image:img2} },
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
          <div style={{ height: "100vh", width: "100vh" }}>
            <MangroveMap geoJsonPath="/mangrove_india.geojson" markers={markers} />
          </div>
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
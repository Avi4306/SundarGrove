import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/User/Login";
import Register from "./components/User/Register";
import Profile from "./components/User/Profile";
import Home from "./components/Home/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import { useSelector } from "react-redux";
import Reports from "./components/Reports/Reports";
import './App.css';
import MangroveMap from "./components/map.jsx"

const markers = [
  { position: [23.0225, 72.5714], popup: "Ahmedabad" },
  { position: [19.076, 72.8777], popup: "Mumbai" },
];

function App() {
  const user = useSelector((state) => state.auth.user);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/report" element={<Reports />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route path="/map" element={
          <div style={{ height: "100vh", width: "100vh" }}>
            <MangroveMap geoJsonPath="/mangrove_india.geojson" markers={markers} />
          </div>
        }>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
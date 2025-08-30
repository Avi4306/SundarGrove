import { Routes, Route, Link } from "react-router-dom";
import Login from "./components/User/Login";
import Register from "./components/User/Register";
import Profile from "./components/User/Profile";
import Home from "./components/Home/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import { useSelector } from "react-redux";
import Reports from "./components/Reports/Reports";
import './App.css';
import Leaderboard from "./components/Leaderboard/Leaderboard";
function App() {

  return (
    <Routes>
      <Route path="/" element={
        <Home />
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
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/leaderboard"
        element={<Leaderboard />}
  />
      
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
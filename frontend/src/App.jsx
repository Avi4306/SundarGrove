import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/User/Login";
import Register from "./components/User/Register";
import Profile from "./components/User/Profile";
import Home from "./components/Home/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import { useSelector } from "react-redux";
import Reports from "./components/Reports/Reports";
import Homepage from "./components/Home/Homepage";
import './App.css';
function App() {
  const user = useSelector((state) => state.auth.user);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/homepage" element={<Homepage />} />
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
      </Routes>
    </Router>
  );
}

export default App;
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/User/Login";
import Register from "./components/User/Register";
import Profile from "./components/User/Profile";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route path="/api/user/login" element={<Login />} />
        <Route path="/api/user/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
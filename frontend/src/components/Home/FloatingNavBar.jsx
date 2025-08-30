import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import logo from "../../assets/SG-Logo.png";

export default function FloatingNavBar() {
  const { user } = useSelector((state) => state.auth);

  return (
    <nav className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-white/80 backdrop-blur-lg shadow-lg rounded-full px-8 py-3 flex gap-8 items-center z-50 border border-green-200">
      <img src={logo} alt="SundarGrove Logo" className="h-10 w-10 rounded-full shadow-md" />
      <Link to="/" className="text-green-700 font-semibold hover:text-blue-600 transition">
        Home
      </Link>
      <Link to="/reports" className="text-green-700 font-semibold hover:text-blue-600 transition">
        Reports
      </Link>

      {user ? (
        <Link to="/profile" className="text-green-700 font-semibold hover:text-blue-600 transition">
          Profile
        </Link>
      ) : (
        <Link to="/login" className="text-green-700 font-semibold hover:text-blue-600 transition">
          Login
        </Link>
      )}
    </nav>
  );
}
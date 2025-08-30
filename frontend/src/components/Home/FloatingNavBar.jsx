import React, { useState } from "react";
import { useSelector } from "react-redux";
import logo from "../../assets/LOGO.png";
import { Link } from "react-router-dom";

export default function FloatingNavBar() {
  const { user } = useSelector((state) => state.auth);

  const [showMapTooltip, setShowMapTooltip] = useState(false);

  return (
    <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-white/80 backdrop-blur-lg shadow-lg rounded-full px-8 py-3 flex gap-8 items-center z-50 border border-green-200">
      <img src={logo} alt="SundarGrove Logo" className="h-10 w-10 rounded-full shadow-md" />
      <Link to="/" className="text-green-700 font-semibold hover:text-blue-600 transition">
        Home
      </Link>
      <Link to="/reports" className="text-green-700 font-semibold hover:text-blue-600 transition">
        Reports
      </Link>
      <Link to="/leaderboard" className="text-green-700 font-semibold hover:text-blue-600 transition">
        Leaderboard
      </Link>
      <div className="relative flex items-center"
        onMouseEnter={() => setShowMapTooltip(true)}
        onMouseLeave={() => setShowMapTooltip(false)}>
        <Link to="/map" className="text-green-700 font-semibold hover:text-blue-600 transition">
          Map
        </Link>
        {showMapTooltip && (
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-green-700 text-white text-xs px-3 py-1 rounded shadow-lg whitespace-nowrap z-50 animate-fadeIn">
            See number of reports region wise
          </div>
        )}
      </div>
      {user ? (
        <Link to="/profile" className="text-green-700 font-semibold hover:text-blue-600 transition">
          Profile
        </Link>
      ) : (
        <Link to="/login" className="text-green-700 font-semibold hover:text-blue-600 transition">
          Login
        </Link>
      )}
      {/* Tooltip fade-in animation */}
      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(8px);} to { opacity: 1; transform: translateY(0);} }
        .animate-fadeIn { animation: fadeIn 0.2s ease; }
      `}</style>
    </nav>
  );
}
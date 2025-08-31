import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function FloatingNavBar() {
  const { user } = useSelector((state) => state.auth);
  const [showMapTooltip, setShowMapTooltip] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-lg shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="text-2xl font-bold text-green-700">
            SundarGrove
          </Link>
        </div>
        <div className="hidden md:flex gap-6 lg:gap-8 items-center">
          <Link to="/" className="text-green-700 font-semibold hover:text-blue-600 transition text-sm lg:text-base">
            Home
          </Link>
          <Link to="/reports" className="text-green-700 font-semibold hover:text-blue-600 transition text-sm lg:text-base">
            Reports
          </Link>
          <Link to="/leaderboard" className="text-green-700 font-semibold hover:text-blue-600 transition text-sm lg:text-base">
            Leaderboard
          </Link>
          <div
            className="relative flex items-center"
            onMouseEnter={() => setShowMapTooltip(true)}
            onMouseLeave={() => setShowMapTooltip(false)}
          >
            <Link to="/map" className="text-green-700 font-semibold hover:text-blue-600 transition text-sm lg:text-base">
              Map
            </Link>
            {showMapTooltip && (
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-green-700 text-white text-xs px-3 py-1 rounded shadow-lg whitespace-nowrap z-50 animate-fadeIn">
                See number of reports region wise
              </div>
            )}
          </div>
          {user && user.role === "admin" && (
            <Link to="/admin" className="text-green-700 font-semibold hover:text-blue-600 transition text-sm lg:text-base">
              Admin
            </Link>
          )}
          {user ? (
            <Link to="/profile" className="text-green-700 font-semibold hover:text-blue-600 transition text-sm lg:text-base">
              Profile
            </Link>
          ) : (
            <Link to="/login" className="text-green-700 font-semibold hover:text-blue-600 transition text-sm lg:text-base">
              Login
            </Link>
          )}
        </div>
        <button
          className="md:hidden flex items-center px-3 py-2 border rounded text-green-700 border-green-700 hover:text-blue-600 hover:border-blue-600"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
      {isMobileMenuOpen && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-lg shadow-xl rounded-2xl p-6 z-40 w-[90%] max-w-sm md:hidden border border-green-200 transition-all duration-200 ease-out animate-slideDown">
          <div className="flex flex-col space-y-4">
            <Link
              to="/"
              className="text-green-700 font-semibold hover:text-blue-600 transition text-center py-2 rounded-lg hover:bg-green-50"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/reports"
              className="text-green-700 font-semibold hover:text-blue-600 transition text-center py-2 rounded-lg hover:bg-green-50"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Reports
            </Link>
            <Link
              to="/leaderboard"
              className="text-green-700 font-semibold hover:text-blue-600 transition text-center py-2 rounded-lg hover:bg-green-50"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Leaderboard
            </Link>
            <Link
              to="/map"
              className="text-green-700 font-semibold hover:text-blue-600 transition text-center py-2 rounded-lg hover:bg-green-50"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Map
            </Link>
            {user && user.role === "admin" && (
              <Link
                to="/admin"
                className="text-green-700 font-semibold hover:text-blue-600 transition text-center py-2 rounded-lg hover:bg-green-50"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Admin
              </Link>
            )}
            {user ? (
              <Link
                to="/profile"
                className="text-green-700 font-semibold hover:text-blue-600 transition text-center py-2 rounded-lg hover:bg-green-50"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Profile
              </Link>
            ) : (
              <Link
                to="/login"
                className="text-green-700 font-semibold hover:text-blue-600 transition text-center py-2 rounded-lg hover:bg-green-50"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
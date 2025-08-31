
import React, { useState } from "react";
import { useSelector } from "react-redux";
import logo from "../../assets/LOGO.png";
import { Link } from "react-router-dom";

export default function FloatingNavBar() {
  const { user } = useSelector((state) => state.auth);
  const [showMapTooltip, setShowMapTooltip] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-white/80 backdrop-blur-lg shadow-lg rounded-full px-4 md:px-8 py-3 z-50 border border-green-200 w-[95%] max-w-4xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={logo} alt="SundarGrove Logo" className="h-8 w-8 md:h-10 md:w-10 rounded-full shadow-md flex-shrink-0" />
            <span className="text-green-800 font-bold text-lg md:text-xl tracking-wide">SundarGrove</span>
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
            <div className="relative flex items-center"
              onMouseEnter={() => setShowMapTooltip(true)}
              onMouseLeave={() => setShowMapTooltip(false)}>
              <Link to="/map" className="text-green-700 font-semibold hover:text-blue-600 transition text-sm lg:text-base">
                Map
              </Link>
              {showMapTooltip && (
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-green-700 text-white text-xs px-3 py-1 rounded shadow-lg whitespace-nowrap z-50 animate-fadeIn">
                  See number of reports region wise
                </div>
              )}
            </div>
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
            className="md:hidden flex flex-col justify-center items-center w-6 h-6 space-y-1 cursor-pointer transition-all duration-200 ease-out"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <div className={`w-4 h-0.5 bg-green-700 transition-all duration-200 ease-out ${isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></div>
            <div className={`w-4 h-0.5 bg-green-700 transition-all duration-200 ease-out ${isMobileMenuOpen ? 'opacity-0' : ''}`}></div>
            <div className={`w-4 h-0.5 bg-green-700 transition-all duration-200 ease-out ${isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></div>
          </button>
        </div>
      </nav>

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

      <style>{`
        @keyframes fadeIn { 
          from { opacity: 0; transform: translateY(8px); } 
          to { opacity: 1; transform: translateY(0); } 
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translate(-50%, -10px) scale(0.95); }
          to { opacity: 1; transform: translate(-50%, 0px) scale(1); }
        }
        .animate-fadeIn { 
          animation: fadeIn 0.2s ease; 
        }
        .animate-slideDown {
          animation: slideDown 0.2s ease-out;
        }
      `}</style>
    </>
  );
}
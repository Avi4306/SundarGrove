import React from "react";
import logo from "../../assets/SG-Logo.png";

export default function FloatingNavBar() {
  return (
    <nav className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-white/80 backdrop-blur-lg shadow-lg rounded-full px-8 py-3 flex gap-8 items-center z-50 border border-green-200">
      <img src={logo} alt="SundarGrove Logo" className="h-10 w-10 rounded-full shadow-md" />
      <a href="#home" className="text-green-700 font-semibold hover:text-blue-600 transition">Home</a>
      <a href="#about" className="text-green-700 font-semibold hover:text-blue-600 transition">About</a>
      <a href="#reports" className="text-green-700 font-semibold hover:text-blue-600 transition">Reports</a>
      <a href="#login" className="text-green-700 font-semibold hover:text-blue-600 transition">Login</a>
    </nav>
  );
}

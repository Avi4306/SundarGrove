import React from "react";
import logo from "../../assets/SG-Logo.png";
import FloatingNavBar from "./FloatingNavBar";

export default function Homepage() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-[url('./src/assets/SG-1.jpg')]">
      {/* Floating Nav Bar at bottom */}
      <FloatingNavBar />
      {/* Main Card */}
      <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-3xl mt-32 flex flex-col items-center">
        <img
          src={logo}
          alt="SundarGrove Logo"
          className="h-20 w-20 mb-4 rounded-full shadow-lg"
        />
        <h1 className="text-4xl font-bold mb-4 text-green-700 drop-shadow-lg text-center">
          Welcome to SundarGrove
        </h1>
        <p className="text-lg text-gray-600 mb-6 text-center">
          Preserving Mangroves, Empowering Communities
        </p>
        {/* Add more homepage content here, e.g. buttons, links, etc. */}
      </div>
    </div>
  );
}

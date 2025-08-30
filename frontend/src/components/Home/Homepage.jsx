import React from "react";
import logo from "../../assets/SG-Logo.png";
import FloatingNavBar from "./FloatingNavBar";
export default function Homepage() {
  return (
    <div className="relative flex flex-col items-center  min-h-screen bg-[url('./src/assets/SG-1.jpg')]">
      <FloatingNavBar />
      <div>
        <img src={logo} alt="SundarGrove" className="h-60" />
      </div>
      <div className="bg-[rgba(255,255,255,0.6)] rounded-xl shadow-2xl p-8 w-full max-w-3xl flex flex-col items-center">
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

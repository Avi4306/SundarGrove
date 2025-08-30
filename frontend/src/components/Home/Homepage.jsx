import React, { useState, useEffect } from "react";
import logo from "../../assets/SG-Logo.png";
import FloatingNavBar from "./FloatingNavBar";

export default function Homepage() {
  const [ripples, setRipples] = useState([]);
  const [leaves, setLeaves] = useState([]);

  // Create floating mangrove leaves with infinite animation
  useEffect(() => {
    const leafElements = Array.from({ length: 24 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: i * 0.8
    }));
    setLeaves(leafElements);
  }, []);

  // Water ripple effect on click
  const createRipple = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    const newRipple = { id: Date.now(), x, y };
    setRipples(prev => [...prev, newRipple]);
    
    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== newRipple.id));
    }, 1500);
  };

  return (
    <div 
      className="relative flex flex-col items-center justify-center min-h-screen bg-[url('./src/assets/SG-1.jpg')] bg-cover bg-center overflow-hidden  px-4 sm:px-6"
      onClick={createRipple}
    >
      {/* CSS Animations */}
      <style>{`
        @keyframes leafFloat {
          0% { transform: translateY(0px) rotate(0deg); }
          25% { transform: translateY(-15px) rotate(90deg); }
          50% { transform: translateY(0px) rotate(180deg); }
          75% { transform: translateY(-10px) rotate(270deg); }
          100% { transform: translateY(0px) rotate(360deg); }
        }
        
        @keyframes wordChange1 {
          0%, 80% { color: #065f46; }
          20%, 60% { 
            background: linear-gradient(45deg, #059669, #10b981); 
            -webkit-background-clip: text; 
            background-clip: text; 
            color: transparent; 
          }
        }
        
        @keyframes wordChange2 {
          0%, 20%, 80%, 100% { color: #065f46; }
          40%, 60% { 
            background: linear-gradient(45deg, #10b981, #34d399); 
            -webkit-background-clip: text; 
            background-clip: text; 
            color: transparent; 
          }
        }
        
        @keyframes wordChange3 {
          0%, 40%, 100% { color: #065f46; }
          60%, 80% { 
            background: linear-gradient(45deg, #34d399, #059669); 
            -webkit-background-clip: text; 
            background-clip: text; 
            color: transparent; 
          }
        }
        
        .word-change-1 {
          animation: wordChange1 3s ease-in-out infinite;
        }
        
        .word-change-2 {
          animation: wordChange2 3s ease-in-out infinite;
        }
        
        .word-change-3 {
          animation: wordChange3 3s ease-in-out infinite;
        }
      `}</style>

      {/* Floating Mangrove Leaves with infinite animation */}
      {leaves.map(leaf => (
        <div
          key={leaf.id}
          className="absolute w-3 h-5 sm:w-4 sm:h-7 opacity-15 pointer-events-none bg-gradient-to-br from-emerald-600 to-green-500"
          style={{
            left: `${leaf.x}%`,
            top: `${leaf.y}%`,
            borderRadius: '0 80% 0 80%',
            animation: `leafFloat 12s infinite linear`,
            animationDelay: `${leaf.delay}s`
          }}
        />
      ))}

      {/* Water Ripples */}
      {ripples.map(ripple => (
        <div
          key={ripple.id}
          className="absolute pointer-events-none"
          style={{
            left: `${ripple.x}%`,
            top: `${ripple.y}%`,
            transform: 'translate(-50%, -50%)'
          }}
        >
          <div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-cyan-400 rounded-full animate-ping opacity-60"></div>
          <div className="absolute inset-0 w-6 h-6 sm:w-8 sm:h-8 border border-emerald-400 rounded-full animate-ping opacity-30" style={{animationDelay: '0.2s'}}></div>
        </div>
      ))}

      {/* Underwater Light Rays */}
      <div className="absolute inset-0 opacity-15 sm:opacity-20">
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-cyan-300 to-transparent animate-pulse"></div>
        <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-emerald-300 to-transparent animate-pulse" style={{animationDelay: '1.5s'}}></div>
        <div className="absolute top-0 left-2/3 w-px h-full bg-gradient-to-b from-teal-300 to-transparent animate-pulse" style={{animationDelay: '3s'}}></div>
      </div>

      <FloatingNavBar />
      
      {/* Centered Logo */}
      <div className="relative z-20 mb-8 sm:mb-12 mt-16 sm:mt-0">
        <div className="relative group">
          <img 
            src={logo} 
            alt="SundarGrove" 
            className="h-55  md:h-63 drop-shadow-xl filter brightness-110 group-hover:brightness-125 transition-all duration-500" 
          />
        </div>
      </div>
      
      {/* Compact Content Card */}
      <div className="relative z-20 bg-[rgba(255,255,255,0.4)] sm:bg-[rgba(255,255,255,0.4)] backdrop-blur-md border border-emerald-200/60 rounded-2xl sm:rounded-3xl shadow-xl p-4 sm:p-8 w-full max-w-sm sm:max-w-2xl mx-4 sm:mx-6 transform hover:scale-[1.04] sm:hover:scale-[1.05] hover:shadow-2xl transition-all duration-200">
        
        {/* Welcome Text */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-4 sm:mb-6 bg-gradient-to-r from-emerald-800 to-green-700 bg-clip-text text-transparent text-center leading-tight">
          Welcome to SundarGrove
        </h1>
        
        {/* Sequential Word Animation Tagline */}
        <div className="relative mb-6 sm:mb-8">
          <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-black text-center">
            <span className="inline-block word-change-1 mx-1">Report</span>
            <span className="mx-1 sm:mx-2 text-emerald-700">•</span>
            <span className="inline-block word-change-2 mx-1">Protect</span>
            <span className="mx-1 sm:mx-2 text-emerald-700">•</span>
            <span className="inline-block word-change-3 mx-1">Preserve</span>
          </div>
        </div>

        {/* Breathing dots indicator */}
        <div className="flex justify-center space-x-2 sm:space-x-3">
          <div className="w-2 h-2 sm:w-3 sm:h-3 bg-emerald-600 rounded-full animate-pulse"></div>
          <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
          <div className="w-2 h-2 sm:w-3 sm:h-3 bg-teal-500 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>
      </div>
    </div>
  );
}
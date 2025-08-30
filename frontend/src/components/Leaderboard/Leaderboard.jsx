import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTopUsers } from "../../actions/leaderboard";
import FloatingNavBar from "../Home/FloatingNavBar";
import logo from '../../assets/SG-Logo.png';
import bgImage from '../../assets/SG-2.jpg'; // Change to SG-1.jpg if preferred

const ecoColors = {
  bg: "bg-green-100 via-green-200 to-blue-100", // fallback for tailwind
  card: "bg-white/90 border border-green-300 shadow-xl",
  accent: "text-green-700",
  gold: "bg-yellow-300 text-yellow-900",
  silver: "bg-gray-300 text-gray-700",
  bronze: "bg-orange-300 text-orange-900",
  highlight: "bg-green-200 border-2 border-green-600 text-green-900",
};

const Leaderboard = () => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.topUsers);
  const { user: currentUser } = useSelector((state) => state.user || {});

  useEffect(() => {
    dispatch(fetchTopUsers());
  }, [dispatch]);

  if (loading) return <p>Loading leaderboard...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div
      className={`relative min-h-screen flex flex-col items-center justify-center pb-32`}
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <FloatingNavBar activeHref="/leaderboard" />
      <div className={`w-full max-w-xl mt-24 rounded-2xl p-8 flex flex-col items-center ${ecoColors.card}`}>
        <img src={logo} alt="Mangrove Logo" className="h-16 w-16 mb-4 rounded-full shadow-lg" />
        <h2 className={`text-3xl font-bold mb-6 text-center ${ecoColors.accent} drop-shadow-lg`}>Mangrove Eco-Leaderboard</h2>
        <p className="mb-8 text-green-800 text-center">Celebrating top contributors to mangrove conservation!</p>
        <ol className="w-full">
          {users.map((user, index) => {
            let rankStyle = "";
            if (index === 0) rankStyle = ecoColors.gold;
            else if (index === 1) rankStyle = ecoColors.silver;
            else if (index === 2) rankStyle = ecoColors.bronze;
            else rankStyle = ecoColors.accent;
            // Highlight current user
            if (currentUser && (user._id === currentUser._id || user.name === currentUser.name)) {
              rankStyle += ` ${ecoColors.highlight}`;
            }
            return (
              <li key={user._id} className={`mb-4 rounded-xl px-6 py-3 flex justify-between items-center font-semibold text-lg ${rankStyle} shadow-md transition-all duration-200 hover:scale-105`}>
                <span>{user.name}</span>
                <span>{user.points} pts</span>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
};

export default Leaderboard;

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTopUsers } from "../../actions/leaderboard";
import FloatingNavBar from "../Home/FloatingNavBar";
import logo from '../../assets/SG-Logo.png';
import bgImage from '../../assets/SG-2.jpg';

const ecoColors = {
  bg: "bg-green-100 via-green-200 to-blue-100",
  card: "bg-white/90 border border-green-300 shadow-xl",
  accent: "text-green-700",
  gold: "bg-yellow-300 text-yellow-900",
  silver: "bg-gray-300 text-gray-700",
  bronze: "bg-orange-300 text-orange-900",
  highlight: "bg-green-200 border-2 border-green-600 text-green-900",
};

const Leaderboard = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.topUsers);
  const { user: currentUser } = useSelector((state) => state.auth || {});

  useEffect(() => {
    dispatch(fetchTopUsers());
  }, [dispatch]);

  if (loading) return <p className="text-center mt-32 text-lg">Loading leaderboard...</p>;
  if (error) return <p className="text-red-500 text-center mt-32">{error}</p>;

  return (
    <div
      className="relative min-h-screen flex flex-col items-center justify-center pb-16 sm:pb-32 px-4 sm:px-6"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <FloatingNavBar activeHref="/leaderboard" />
      <div className={`w-full max-w-xs sm:max-w-lg md:max-w-xl lg:max-w-2xl mt-20 sm:mt-24 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 flex flex-col items-center ${ecoColors.card}`}>
        <img src={logo} alt="Mangrove Logo" className="h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 mb-3 sm:mb-4 rounded-full shadow-lg" />
        <h2 className={`text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 text-center ${ecoColors.accent} drop-shadow-lg`}>
          Report Leaderboard
        </h2>
        <p className="mb-6 sm:mb-8 text-green-800 text-center text-sm sm:text-base px-2">
          Celebrating top contributors to mangrove conservation!
        </p>
        <ol className="w-full space-y-2 sm:space-y-3 md:space-y-4">
          {users.map((user, index) => {
            let rankStyle = "";
            if (index === 0) rankStyle = ecoColors.gold;
            else if (index === 1) rankStyle = ecoColors.silver;
            else if (index === 2) rankStyle = ecoColors.bronze;
            else rankStyle = ecoColors.accent;
            
            if (currentUser && (user._id && currentUser._id && user._id === currentUser._id)) {
              rankStyle += ` ${ecoColors.highlight}`;
            } else if (currentUser && user.name && currentUser.name && user.name === currentUser.name) {
              rankStyle += ` ${ecoColors.highlight}`;
            }
            
            return (
              <li 
                key={user._id} 
                className={`rounded-lg sm:rounded-xl px-3 sm:px-4 md:px-6 py-2 sm:py-3 flex justify-between items-center font-semibold text-sm sm:text-base md:text-lg ${rankStyle} shadow-md transition-all duration-200 hover:scale-[1.02] sm:hover:scale-105`}
              >
                <span className="truncate pr-2 flex-1">{(currentUser && ((user._id && currentUser._id && user._id === currentUser._id) || (user.name && currentUser.name && user.name === currentUser.name))) ? 'You' : user.name}</span>
                <span className="text-xs sm:text-sm md:text-base font-bold flex-shrink-0">{user.points} pts</span>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
};

export default Leaderboard;
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/user";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FloatingNavBar from "../Home/FloatingNavBar";
import { motion } from "framer-motion";

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};
const badgeVariants = {
  rest: { scale: 1, boxShadow: "0 2px 8px rgba(16, 185, 129, 0.08)" },
  hover: { scale: 1.05, boxShadow: "0 4px 16px rgba(16, 185, 129, 0.18)" },
};

function Profile() {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user && !loading) {
      navigate("/login");
    }
  }, [user, loading, navigate]);

  const [editMode, setEditMode] = useState(false);
  const [editForm, setEditForm] = useState({ name: user?.name || "" });

  if (loading) return <p className="p-4">Loading...</p>;
  if (!user) return null;

  const points = user.points || 0;
  const verified = user.verifiedReports || 0;
  const reported = user.reportedCount || 0;
  const rank = user.rank || "Unranked";
  const badges = user.badges || [];

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-2 sm:px-6 md:px-12 pt-20 bg-[url('./src/assets/SG-1.jpg')] bg-cover bg-center">
      <FloatingNavBar />
      <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 sm:p-8">
  <div className="flex flex-col lg:flex-row gap-8 sm:gap-16 w-full max-w-xs sm:max-w-2xl md:max-w-4xl lg:max-w-5xl justify-center items-stretch">
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            className="bg-white/95 rounded-2xl shadow-2xl p-6 sm:p-12 flex-1 flex flex-col justify-center items-center border-2 border-green-300 min-w-0 mb-6 md:mb-0"
          >
            <motion.img
              src="./src/assets/SG-Logo.png"
              alt="Avatar"
              className="h-16 w-16 sm:h-24 sm:w-24 rounded-full shadow-md mb-2 sm:mb-4 border-2 border-green-500"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              whileHover={{ scale: 1.08, boxShadow: "0 8px 32px rgba(16, 185, 129, 0.18)" }}
            />
            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold mb-1 sm:mb-2 text-green-700 tracking-wide break-words text-center">{user.name}</h2>
            <p className="text-base sm:text-lg text-gray-700 mb-1 sm:mb-2 break-words text-center">{user.email}</p>
            <div className="flex gap-2 sm:gap-4 mb-2 sm:mb-4 flex-wrap justify-center">
              <motion.div className="bg-green-100 rounded-xl px-2 sm:px-4 py-2 text-center shadow-sm min-w-[80px]" whileHover={{ scale: 1.04 }}>
                <div className="text-xl font-bold text-green-800">{points}</div>
                <div className="text-xs text-green-700">Points</div>
              </motion.div>
              <motion.div className="bg-blue-100 rounded-xl px-2 sm:px-4 py-2 text-center shadow-sm min-w-[80px]" whileHover={{ scale: 1.04 }}>
                <div className="text-xl font-bold text-blue-800">{verified}</div>
                <div className="text-xs text-blue-700">Verified</div>
              </motion.div>
              <motion.div className="bg-orange-100 rounded-xl px-2 sm:px-4 py-2 text-center shadow-sm min-w-[80px]" whileHover={{ scale: 1.04 }}>
                <div className="text-xl font-bold text-orange-800">{reported}</div>
                <div className="text-xs text-orange-700">Reported</div>
              </motion.div>
            </div>
            <motion.div className="bg-yellow-100 rounded-xl px-2 sm:px-4 py-2 text-center shadow-sm mb-2 sm:mb-4 min-w-[80px]" whileHover={{ scale: 1.04 }}>
              <div className="text-lg font-bold text-yellow-800">Rank</div>
              <div className="text-xl font-extrabold text-yellow-900">{rank}</div>
            </motion.div>
            <div className="flex flex-wrap gap-2 mt-2 sm:mt-4 justify-center">
              <motion.button className="bg-green-700 text-white px-3 sm:px-4 py-2 rounded shadow hover:bg-green-800 transition font-bold tracking-wide" whileHover={{ scale: 1.05 }} onClick={() => setEditMode(true)}>
                Edit Profile
              </motion.button>
              <motion.button className="bg-red-600 text-white px-3 sm:px-4 py-2 rounded shadow hover:bg-red-700 transition font-bold tracking-wide" whileHover={{ scale: 1.05 }} onClick={() => dispatch(logout())}>
                Logout
              </motion.button>
            </div>
            {error && <p className="text-red-500 mt-3">{error}</p>}
          </motion.div>

          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            className="bg-white/95 rounded-2xl shadow-2xl p-6 sm:p-12 flex-1 flex flex-col justify-center items-center border-2 border-green-300 min-w-0"
          >
            <h2 className="text-lg sm:text-2xl font-bold mb-2 sm:mb-4 text-green-700 text-center">Badges & Achievements</h2>
            <div className="flex flex-wrap gap-2 sm:gap-4 justify-center mb-2 sm:mb-6">
              {badges.length > 0 ? (
                badges.map((badge, i) => (
                  <motion.div
                    key={i}
                    variants={badgeVariants}
                    initial="rest"
                    whileHover="hover"
                    className="bg-green-50 border border-green-300 rounded-full px-4 sm:px-6 py-2 sm:py-3 shadow-sm text-green-900 font-semibold flex flex-col items-center min-w-[80px]"
                  >
                    <span className="text-lg">🏅 {badge.name}</span>
                    <span className="text-xs text-gray-500">{new Date(badge.awardedAt).toLocaleDateString()}</span>
                  </motion.div>
                ))
              ) : (
                <span className="text-gray-500">No badges yet</span>
              )}
            </div>
            <h3 className="text-base sm:text-lg font-bold text-green-700 mb-1 sm:mb-2 text-center">Leaderboard</h3>
            <motion.div className="bg-blue-50 border border-blue-300 rounded-xl px-4 sm:px-6 py-2 sm:py-3 shadow-sm text-blue-900 font-semibold flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4" whileHover={{ scale: 1.04 }}>
              <span className="text-base sm:text-xl">Rank: {rank}</span>
              <span className="text-base sm:text-lg">Points: {points}</span>
            </motion.div>
            <div className="mt-2 sm:mt-6 flex justify-center">
              <motion.svg width="200" height="130" viewBox="0 0 220 140" initial={{ opacity: 0.8 }} whileHover={{ opacity: 1, scale: 1.04 }}>
                <circle cx="80" cy="70" r="45" fill="#bbf7d0" stroke="#047857" strokeWidth="5" />
                <circle cx="160" cy="70" r="33" fill="#bae6fd" stroke="#0369a1" strokeWidth="5" />
                <text x="80" y="80" textAnchor="middle" fontSize="20" fill="#047857">{points} pts</text>
                <text x="160" y="80" textAnchor="middle" fontSize="18" fill="#0369a1">{verified} ✓</text>
                <text x="120" y="135" textAnchor="middle" fontSize="20" fill="#166534">Reports: {reported}</text>
              </motion.svg>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
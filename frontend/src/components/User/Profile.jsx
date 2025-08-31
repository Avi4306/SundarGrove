import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import FloatingNavBar from "../Home/FloatingNavBar";
import SGLogo from "../../assets/LOGO.png";
import SG1 from "../../assets/SG-1.jpg";
import { updatePf, logout } from "../../actions/user";

// Animation variants for framer-motion
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const messageVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 300, damping: 25 } },
  exit: { opacity: 0, y: 50, scale: 0.9, transition: { duration: 0.2 } }
};

function Profile() {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [editMode, setEditMode] = useState(false);
  const [editForm, setEditForm] = useState({ name: user?.name || "" });
  const [editError, setEditError] = useState("");
  const [editSuccess, setEditSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!user && !loading) {
      navigate("/login");
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (user) {
      setEditForm({ name: user.name || "" });
    }
  }, [user]);

  // Handle messages fading out automatically
  useEffect(() => {
    if (editSuccess) {
      const timer = setTimeout(() => setEditSuccess(""), 3000);
      return () => clearTimeout(timer);
    }
    if (editError) {
      const timer = setTimeout(() => setEditError(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [editSuccess, editError]);


  if (loading) return <p className="p-4">Loading...</p>;
  if (!user) return null;

  const points = user.points || 0;
  const verified = user.verifiedReports || 0;
  const reported = user.reportedCount || 0;
  const rank = user.rank || "Unranked";
  const badges = user.badges || [];

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setEditError("");
    setEditSuccess("");
    if (!editForm.name.trim()) {
      setEditError("Name cannot be empty.");
      return;
    }

    setIsSubmitting(true);
    try {
      await dispatch(updatePf({ name: editForm.name.trim() }));
      setEditSuccess("Profile updated successfully!");
      setEditMode(false);
    } catch (err) {
      setEditError("Failed to update profile. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setEditError("");
    setEditSuccess("");
    setEditForm({ name: user.name });
  };

  return (
    <div
      className="relative min-h-screen flex flex-col items-center justify-center px-2 sm:px-6 md:px-12 pt-20 bg-cover bg-center"
      style={{ backgroundImage: `url(${SG1})` }}
    >
      <FloatingNavBar />
      
      <AnimatePresence>
        {(editSuccess || editError) && (
          <motion.div
            variants={messageVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={`fixed top-24 z-50 rounded-xl px-6 py-3 font-semibold shadow-lg text-white ${editSuccess ? 'bg-green-600' : 'bg-red-600'}`}
          >
            {editSuccess || editError}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 sm:p-8">
        <div className="flex flex-col lg:flex-row gap-8 sm:gap-16 w-full max-w-xs sm:max-w-2xl md:max-w-4xl lg:max-w-5xl justify-center items-stretch">
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            className="bg-white/95 rounded-2xl shadow-2xl p-6 sm:p-12 flex-1 flex flex-col justify-center items-center border-2 border-green-300 min-w-0 mb-6 md:mb-0"
          >
            <motion.img
              src={SGLogo}
              alt="Avatar"
              className="h-16 w-16 sm:h-24 sm:w-24 rounded-full shadow-md mb-2 sm:mb-4 border-2 border-green-500"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              whileHover={{ scale: 1.08, boxShadow: "0 8px 32px rgba(16, 185, 129, 0.18)" }}
            />
            {!editMode ? (
              <>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold mb-1 sm:mb-2 text-green-700 tracking-wide break-words text-center">
                  {user.name}
                </h2>
                <p className="text-base sm:text-lg text-gray-700 mb-1 sm:mb-2 break-words text-center">
                  {user.email}
                </p>
                <div className="flex gap-2 sm:gap-4 mb-2 sm:mb-4 flex-wrap justify-center">
                  <motion.div
                    className="bg-green-100 rounded-xl px-2 sm:px-4 py-2 text-center shadow-sm min-w-[80px]"
                    whileHover={{ scale: 1.04 }}
                  >
                    <div className="text-xl font-bold text-green-800">{points}</div>
                    <div className="text-xs text-green-700">Points</div>
                  </motion.div>
                  <motion.div
                    className="bg-blue-100 rounded-xl px-2 sm:px-4 py-2 text-center shadow-sm min-w-[80px]"
                    whileHover={{ scale: 1.04 }}
                  >
                    <div className="text-xl font-bold text-blue-800">{verified}</div>
                    <div className="text-xs text-blue-700">Verified</div>
                  </motion.div>
                  <motion.div
                    className="bg-orange-100 rounded-xl px-2 sm:px-4 py-2 text-center shadow-sm min-w-[80px]"
                    whileHover={{ scale: 1.04 }}
                  >
                    <div className="text-xl font-bold text-orange-800">{reported}</div>
                    <div className="text-xs text-orange-700">Reported</div>
                  </motion.div>
                </div>
                <motion.div
                  className="bg-yellow-100 rounded-xl px-2 sm:px-4 py-2 text-center shadow-sm mb-2 sm:mb-4 min-w-[80px]"
                  whileHover={{ scale: 1.04 }}
                >
                  <div className="text-lg font-bold text-yellow-800">Rank</div>
                  <div className="text-xl font-extrabold text-yellow-900">{rank}</div>
                </motion.div>
                <div className="flex flex-wrap gap-2 mt-2 sm:mt-4 justify-center">
                  <motion.button
                    className="bg-green-700 text-white px-3 sm:px-4 py-2 rounded-xl shadow hover:bg-green-800 transition font-bold tracking-wide transform hover:scale-105"
                    whileHover={{ scale: 1.05 }}
                    onClick={() => setEditMode(true)}
                  >
                    Edit Profile
                  </motion.button>
                  <motion.button
                    className="bg-red-600 text-white px-3 sm:px-4 py-2 rounded-xl shadow hover:bg-red-700 transition font-bold tracking-wide transform hover:scale-105"
                    whileHover={{ scale: 1.05 }}
                    onClick={() => dispatch(logout())}
                  >
                    Logout
                  </motion.button>
                </div>
                {error && <p className="text-red-500 mt-3">{error}</p>}
              </>
            ) : (
              <form onSubmit={handleEditSubmit} className="w-full flex flex-col items-center gap-4 mt-2">
                <input
                  type="text"
                  value={editForm.name}
                  onChange={e => setEditForm({ ...editForm, name: e.target.value })}
                  className="rounded-xl px-4 py-3 bg-green-50 border border-green-300 w-full text-center focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all"
                  placeholder="Enter your name"
                  required
                />
                <div className="flex gap-4 mt-2">
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-green-700 text-white px-6 py-3 rounded-xl shadow-md hover:bg-green-800 transition font-bold transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {isSubmitting ? "Saving..." : "Save Changes"}
                  </motion.button>
                  <motion.button
                    type="button"
                    onClick={handleCancelEdit}
                    disabled={isSubmitting}
                    className="bg-gray-400 text-white px-6 py-3 rounded-xl shadow-md hover:bg-gray-500 transition font-bold transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Cancel
                  </motion.button>
                </div>
              </form>
            )}
          </motion.div>
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            className="bg-white/95 rounded-2xl shadow-2xl p-6 sm:p-12 flex-1 flex flex-col justify-center items-center border-2 border-green-300 min-w-0"
          >
            <h3 className="text-lg font-bold mb-2 text-green-700">Badges</h3>
            <div className="flex flex-wrap gap-2 justify-center">
              {badges.length === 0 ? (
                <span className="text-gray-500">No badges yet.</span>
              ) : (
                badges.map((badge, idx) => (
                  <span
                    key={idx}
                    className="bg-green-200 text-green-900 px-3 py-1 rounded-full text-xs font-semibold shadow"
                  >
                    {badge.name}
                  </span>
                ))
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
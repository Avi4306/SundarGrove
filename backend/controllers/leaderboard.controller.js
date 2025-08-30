import User from "../models/user.models.js";

export const getTopUsers = async (req, res) => {
  try {
    const topUsers = await User.find({ isActive: true })  // only active users
      .sort({ points: -1 })  // descending order
      .limit(5)              // top 5
      .select("name points badges verifiedReports"); // select fields to return

    res.status(200).json(topUsers);
  } catch (err) {
    console.error("Error fetching top users:", err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

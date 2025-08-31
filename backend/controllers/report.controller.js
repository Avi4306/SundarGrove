import Report from "../models/report.models.js";
import User from '../models/user.models.js';

export const createReport = async (req, res) => {
  try {
    const { title, description, imageUrl, status, location } = req.body;

    console.log("Incoming body:", req.body); // Debugging
    console.log("Creating report with status:", status);

    const newReport = new Report({
      title,
      description,
      imageUrl, 
      status,
      location, // ✅ saved as GeoJSON
      createdBy: req.user?._id || null, // safer than req.user.id
    });

    await newReport.save();
    const update = { $inc: { reportCount: 1 } };
    if (status === 'verified') {
      update.$inc.verifiedReports = 1;
      update.$inc.points = 10;
    } else if (status === 'rejected') {
      update.$inc.points = -10;
    }

    // Update user stats
    await User.findByIdAndUpdate(req.user.id, update);
    res.status(201).json(newReport);
  } catch (error) {
    console.error("Error creating report:", error);
    res.status(500).json({ message: "Error creating report", error: error.message });
  }
};

export const getReports = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const reports = await Report.find({ createdBy: req.user._id })
      .populate("createdBy", "name email role");

    res.status(200).json(reports);
  } catch (error) {
    console.error("Error fetching reports:", error);
    res.status(500).json({ message: "Error fetching reports", error: error.message });
  }
};

import Report from "../models/report.models.js";

export const createReport = async (req, res) => {
  try {
    const { title, description, imageUrl, status} = req.body;
    console.log("Creating report with status:", status);
    const newReport = new Report({
      title,
      description,
      imageUrl, // Cloudinary returns a URL here
      createdBy: req.user.id,   // assuming user is authenticated
      status,
    });

    await newReport.save();
    res.status(201).json(newReport);
  } catch (error) {
    res.status(500).json({ message: "Error creating report", error: error.message });
  }
};

export const getReports = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    // Find reports where the 'createdBy' field matches the logged-in user's ID
    const reports = await Report.find({ createdBy: req.user._id }).populate("createdBy", "name email role");
    res.status(200).json(reports);
  } catch (error) {
    console.error("Error fetching reports:", error);
    res.status(500).json({ message: "Error fetching reports", error: error.message });
  }
};
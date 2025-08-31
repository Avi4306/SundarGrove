import multer from 'multer';
import axios from 'axios';
import FormData from 'form-data';

// Multer memory storage to hold file buffer in memory (no disk storage)
const storage = multer.memoryStorage();
export const upload = multer({ storage });

export const predictMangrove = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image uploaded' });
    }

    const { lat, lng, date_str } = req.body; // take location info

    const formData = new FormData();
    formData.append('image', req.file.buffer, {
      filename: req.file.originalname,
      contentType: req.file.mimetype,
    });

    // --- Step 1: Flask prediction ---
    const flaskRes = await axios.post(`${process.env.FLASK_URL}/predict`, formData, {
      headers: formData.getHeaders(),
      maxContentLength: Infinity,
      maxBodyLength: Infinity,
    });

    let responseData = flaskRes.data;

    // --- Step 2: Similarity API ---
    let similarityStatus = "unknown";
    try {
      if (lat && lng && date_str) {
        const simRes = await axios.post(
          "https://cosine-similarity-2.onrender.com/calculate_similarity",
          {
            lat: parseFloat(lat),
            lng: parseFloat(lng),
            date_str,
            threshold: 0.8,
          }
        );
        similarityStatus = simRes.data.status; // SIGNIFICANT_CHANGE or NO_SIGNIFICANT_CHANGE
      }
    } catch (err) {
      console.error("Similarity API error:", err.message);
    }

    // --- Step 3: Combine for final status ---
    if (responseData.confidence > 0.8 && responseData.prediction === "nonmangrove") {
      responseData.status = "rejected";
    } else if (responseData.prediction === "mangrove") {
      if (similarityStatus === "SIGNIFICANT_CHANGE") {
        responseData.status = "accepted"; // new case
      } else if (responseData.confidence > 0.7) {
        responseData.status = "accepted";
      } else {
        responseData.status = "pending";
      }
    } else {
      responseData.status = "pending";
    }

    console.log("Final Status:", responseData.status);
    return res.json(responseData);

  } catch (error) {
    console.error("Prediction error:", error.message);
    res.status(500).json({ error: "Prediction failed" });
  }
};

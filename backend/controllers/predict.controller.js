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

    const formData = new FormData();
    // Append file buffer with original filename and mimetype
    formData.append('image', req.file.buffer, {
      filename: req.file.originalname,
      contentType: req.file.mimetype,
    });

    // Post to Flask backend
    const response = await axios.post('http://127.0.0.1:5000/predict', formData, {
      headers: formData.getHeaders(), // Proper multipart headers
      maxContentLength: Infinity,
      maxBodyLength: Infinity,
    });
    console.log('Prediction response:', response.data);
    if(response.data.confidence > 0.8 && response.data.prediction === 'nonmangrove'){
      response.data.status = 'rejected';
    }
    else if(response.data.confidence > 0.7 && response.data.prediction === 'mangrove'){
      response.data.status = 'accepted';
    }
    else{
      response.data.status = 'pending';
    }
    return res.json(response.data);
  } catch (error) {
    console.error('Prediction error:', error.message);
    res.status(500).json({ error: 'Prediction failed' });
  }
};

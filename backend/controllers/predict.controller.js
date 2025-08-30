import axios from 'axios';
import FormData from 'form-data';

// Controller to proxy image upload to Flask backend
export const predictMangrove = async (req, res) => {
  try {
    // Check if image file is present
    console.log(req.files);
    if (!req.files || !req.files.image) {
      return res.status(400).json({ error: 'No image uploaded' });
    }

    const image = req.files.image;

    // Prepare form data for Flask
    const formData = new FormData();
    formData.append('image', image.data, image.name);

    // Send POST request to Flask backend
    const response = await axios.post('http://127.0.0.1:5000/predict', formData, {
      headers: formData.getHeaders(),
    });

    // Return Flask response to frontend
    return res.json(response.data);
  } catch (error) {
    console.error('Prediction error:', error.message);
    res.status(500).json({ error: 'Prediction failed' });
  }
};
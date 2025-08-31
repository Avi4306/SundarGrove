import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import fs from 'fs';
import path from 'path';
import * as turf from '@turf/turf';
import cors from 'cors';
import exifReader from 'exif-reader';
import './config/cloudinary.js';
import { uploadImageToCloudinary } from './controllers/upload.controller.js';
import { predictMangrove, upload } from './controllers/predict.controller.js';  // include multer upload
import { connectDB } from './config/db.js';
import userRouter from './routes/userRoutes.js';
import reportRouter from './routes/reportRoutes.js';
import LeaderboardRouter from './routes/leaderboardRoutes.js';
import adminRouter from "./routes/adminRoutes.js";

const app = express();

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(cors());

app.use('/api', userRouter);
app.post('/api/upload', uploadImageToCloudinary);
app.use('/api', reportRouter);
app.use('/api', LeaderboardRouter);
app.use('/api/admin', adminRouter)

// Use multer middleware before controller on /api/predict POST route
app.post('/api/predict', upload.single('image'), predictMangrove);

// REMOVE any proxy middleware on /api/predict to avoid conflict


app.post('/api/upload-and-analyze', upload.single('reportImage'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No image file uploaded.' });
  }

  try {
    const imageBuffer = fs.readFileSync(req.file.path);
    const exifData = exifReader(imageBuffer);

    // IMPORTANT: Delete the temporary file after processing
    fs.unlinkSync(req.file.path);

    if (exifData && exifData.gps && exifData.exif) {
      const metadata = {
        dateTaken: exifData.exif.DateTimeOriginal,
        gps: {
          latitude: exifData.gps.Latitude,
          longitude: exifData.gps.Longitude,
          altitude: exifData.gps.Altitude,
        }
      };
      res.json({ success: true, metadata: metadata });
    } else {
      res.json({ success: false, metadata: null, message: "No EXIF data found in the image." });
    }
  } catch (error) {
    console.error("Error processing image:", error);
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    res.status(500).json({ error: 'Failed to process image.' });
  }
});


// GET /api/check-coordinates
app.get('/api/check-coordinates', (req, res) => {
  const lat = parseFloat(req.query.lat);
  const lng = parseFloat(req.query.lng);

  if (isNaN(lat) || isNaN(lng)) {
    return res.status(400).json({ error: 'Invalid or missing latitude/longitude parameters.' });
  }
  const mangroveData = JSON.parse(fs.readFileSync('./data/mangrove_india.geojson'));
  const point = turf.point([lng, lat]);
  const isInside = mangroveData.features.some(f => turf.booleanPointInPolygon(point, f.geometry));

  res.json({
    coordinates: { lat, lng },
    isInside
  });
});


// GET /api/get-satellite-image
app.get('/api/get-satellite-image', async (req, res) => {
  const lat = parseFloat(req.query.lat) || 21.9491;
  const lng = parseFloat(req.query.lng) || 88.8795;
  const date = req.query.date || '2025-08-15';

  const delta = 0.5;
  const bbox = {
    north: lat + delta,
    south: lat - delta,
    west: lng - delta,
    east: lng + delta
  };

  const LAYER = "MODIS_Terra_CorrectedReflectance_TrueColor";
  const width = 1024;
  const height = 1024;

const url = `https://gibs.earthdata.nasa.gov/wms/epsg4326/best/wms.cgi?SERVICE=WMS&REQUEST=GetMap&VERSION=1.3.0&LAYERS=${LAYER}&STYLES=&FORMAT=image/png&TIME=${date}&CRS=EPSG:4326&BBOX=${bbox.south},${bbox.west},${bbox.north},${bbox.east}&WIDTH=${width}&HEIGHT=${height}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      return res.status(500).send("Failed to fetch NASA GIBS image");
    }

    const buffer = await response.arrayBuffer();
    res.writeHead(200, { 'Content-Type': 'image/png' });
    res.end(Buffer.from(buffer));

  } catch (err) {
    console.error("Error fetching NASA GIBS image:", err.message);
    res.status(500).send("Failed to fetch NASA GIBS image");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server is running on http://localhost:${PORT}`);
});

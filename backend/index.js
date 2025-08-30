import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import './config/cloudinary.js';
import { uploadImageToCloudinary } from './controllers/upload.controller.js';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { predictMangrove } from './controllers/predict.controller.js';
import {connectDB} from './config/db.js';
import userRouter from "./routes/userRoutes.js";
import reportRouter from "./routes/reportRoutes.js";
import LeaderboardRouter from "./routes/leaderboardRoutes.js";

dotenv.config();
const app = express();
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cors());
app.use('/api', userRouter);
app.post('/api/upload', uploadImageToCloudinary);
app.use('/api', reportRouter)
app.use('/api', LeaderboardRouter)




app.post('/api/predict', predictMangrove);

app.use('/api/predict', createProxyMiddleware({
  target: 'http://127.0.0.1:5000',
  changeOrigin: true,
  pathRewrite: { '^/api/predict': '/predict' },
}));



const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
    await connectDB();
  console.log(`Server is running on port http://localhost:${process.env.PORT || 3000}`);
});
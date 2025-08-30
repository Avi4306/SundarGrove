import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import './config/cloudinary.js';
import { uploadImageToCloudinary } from './controllers/upload.controller.js';
import {connectDB} from './config/db.js';
import userRouter from "./routes/userRoutes.js";
import reportRouter from "./routes/reportRoutes.js";
import LeaderboardRouter from "./routes/leaderboardRoutes.js";
import adminRouter from "./routes/adminRoutes.js";

const app = express();
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cors());
app.use('/api', userRouter);
app.post('/api/upload', uploadImageToCloudinary);
app.use('/api', reportRouter)
app.use('/api', LeaderboardRouter)
app.use('/api/admin', adminRouter)



const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
    await connectDB();
  console.log(`Server is running on port http://localhost:${process.env.PORT || 3000}`);
});
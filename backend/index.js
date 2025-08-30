import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { uploadImageToCloudinary } from './controllers/upload.controller.js';
import home from './routes/userRoutes.js'
dotenv.config();
import {connectDB} from './config/db.js';
import userRouter from "./routes/userRoutes.js";
import reportRouter from "./routes/reportRoutes.js";
import LeaderboardRouter from "./routes/leaderboardRoutes.js";

const app = express();
app.use(express.json());
app.use(cors());

app.get('/',home);
app.use('/api', userRouter);
app.post('/api/upload', uploadImageToCloudinary);
app.use('/api', reportRouter)
app.use('/api', LeaderboardRouter)


const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
    await connectDB();
  console.log(`Server is running on port http://localhost:${process.env.PORT || 3000}`);
});
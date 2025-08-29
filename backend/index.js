import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import {connectDB} from './config/db.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
    await connectDB();
  console.log(`Server is running on port http://localhost:${process.env.PORT || 3000}`);
});
import express from "express";
import { getTopUsers } from "../controllers/leaderboard.controller.js";

const LeaderboardRouter = express.Router();

LeaderboardRouter.get("/leaderboard", getTopUsers);

export default LeaderboardRouter;
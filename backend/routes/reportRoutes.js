import express from "express";
import { getReports, createReport } from "../controllers/report.controller.js";
import { authMiddleware } from "../middleware/auth.js";

const reportRouter = express.Router();

reportRouter.get("/reports", getReports);
reportRouter.post("/reports", authMiddleware, createReport);

export default reportRouter;